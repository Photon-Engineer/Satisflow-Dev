import React from 'react'
//Rete
import Rete from "rete";
import { setOutputMessage, setInputMessage, mapToRequirement } from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { DropControl } from '../controls/DropControl'
import { assemblerRecipes } from '../data/recipes'

export class Assembler extends Rete.Component {
    constructor() {
        super('Assembler')
        this.data.component = AssemblerNode;
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", itemSocket, false);
        node.addOutput(out);
        node.addControl(new DropControl(this.editor,"rec",node,false,"Recipe",assemblerRecipes.name))
        node.addInput(new Rete.Input("i1","Input-1",itemSocket,false));
        node.addInput(new Rete.Input("i2","Input-2",itemSocket,false));
        node.addInput(new Rete.Input("ovc","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        var multi = inputs['ovc'].length ? inputs['ovc'] : 1;

        var idx = assemblerRecipes.name.findIndex(rec => rec === node.data.rec);
        var inp1req;
        var inp2req;
        var prc1 = 0;
        var prc2 = 0;
        var reqPpm;

        var in1complete = false;
        var in2complete = false;

        if(inputs['i1'].length){
            inp1req = mapToRequirement(inputs['i1'][0][0],assemblerRecipes,idx,2)
            console.log(JSON.stringify(inp1req));
            if(inp1req['position']>=0){
                reqPpm = inp1req['reqPpm'] * multi;
                prc1 = inputs['i1'][0][1]/reqPpm;
                setInputMessage(node,this.editor,'i1',inputs['i1'][0][1],[inp1req.reqItem,inp1req.reqPpm*multi]);
                in1complete = true;
            }
        }
        if(inputs['i2'].length){
            inp2req = mapToRequirement(inputs['i2'][0][0],assemblerRecipes,idx,2)
            if(inp2req['position']>=0){
                reqPpm = inp2req['reqPpm'] * multi;
                prc2 = inputs['i2'][0][1]/reqPpm; 
                setInputMessage(node,this.editor,'i2',inputs['i2'][0][1],[inp2req.reqItem,inp2req.reqPpm*multi]);
                in2complete = true;
            }
        }
        
        var prc = Math.min(prc1,prc2);
        var out = prc > 1 ? assemblerRecipes.outppm[idx] * multi : assemblerRecipes.outppm[idx] * multi * prc;
        outputs['o1'] = [assemblerRecipes.out[idx],out];
        


        if(!in1complete && !in2complete){
            setInputMessage(node,this.editor,'i1',0,[assemblerRecipes.in[idx],assemblerRecipes.inppm[idx]*multi])
            setInputMessage(node,this.editor,'i2',0,[assemblerRecipes.in2[idx],assemblerRecipes.inppm2[idx]*multi])
        } else if(in1complete && !in2complete){
            var i2req = inp1req['position'] == 0 ? 1 : 0;
            if(i2req==0){setInputMessage(node,this.editor,'i2',0,[assemblerRecipes.in[idx],assemblerRecipes.inppm[idx]*multi])} else {setInputMessage(node,this.editor,'i2',0,[assemblerRecipes.in2[idx],assemblerRecipes.inppm2[idx]*multi])}
        } else if(!in1complete && in2complete){
            var i1req = inp2req['position'] == 0 ? 1 : 0;
            if(i1req==0){setInputMessage(node,this.editor,'i1',0,[assemblerRecipes.in[idx],assemblerRecipes.inppm[idx]*multi])} else {setInputMessage(node,this.editor,'i1',0,[assemblerRecipes.in2[idx],assemblerRecipes.inppm2[idx]*multi])}
        }
        
        const maxout = [assemblerRecipes.out[idx],assemblerRecipes.outppm[idx] * multi];
        setOutputMessage(node,this.editor,'o1',out,maxout);
        
    }
}

export class AssemblerNode extends Node {
    style = { background: "lightsalmon", borderColor: "red", opacity:"0.8"};
    fontStyle = {color:"black"}
    fontAndPadding = {...this.fontStyle, padding:"0px"};
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;

        return (
            <div className={`node ${selected}`} style={this.style}>
                
                <div className="title" style={this.fontStyle}>{node.name}</div>
                <div className="input" key="i1" style={{float:"left"}}>
                    <Socket
                        type="input"
                        socket={inputs[0].socket}
                        io={inputs[0]}
                        innerRef={bindSocket}
                    />
                </div>
                
                <div className="control" style={this.fontAndPadding}>
                    <Control
                        className="control"
                        key={controls[0].key}
                        control={controls[0]}
                        innerRef={bindControl}
                    />
                </div>
                
                <div className="output" key="o1" style={{float:"right"}}>
                    <Socket
                        type="output"
                        socket={outputs[0].socket}
                        io={outputs[0]}
                        innerRef={bindSocket}
                    />
                </div>
                <div className="control" style={this.fontStyle}>{outputs[0].name}</div>
                <div className="control" style={this.fontStyle}>{inputs[0].name}</div>
                <div className="input" key="i2" style={{float:"left"}}>
                    <Socket
                        type="input"
                        socket={inputs[1].socket}
                        io={inputs[1]}
                        innerRef={bindSocket}
                    />
                </div>
                <div className="control" style={this.fontStyle}>{inputs[1].name}</div>
                <div className="control" style={{height:"0px"}}>&nbsp;</div> {/* THIS LINE FIXES AN ISSUE WITH THE OVERCLOCK SOCKET. It was getting pushed over to make room for the floating input socket above it.*/}
                <div className="input" key="ovc" style={{padding:"0px"}}>
                    <Socket
                        type="input"
                        socket={inputs[2].socket}
                        io={inputs[2]}
                        innerRef={bindSocket}
                    />
                    <div className="input-title" style={this.fontStyle}>{inputs[2].name}</div>
                </div>
            </div>
        );
    }
}