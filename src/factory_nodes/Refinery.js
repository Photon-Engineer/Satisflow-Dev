import React from 'react'
//Rete
import Rete from "rete";
import { setOutputMessage, setInputMessage, mapToRequirement2 } from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { itemSocket, numSocket, pipeSocket } from '../sockets/AllSockets'
import { DropControl } from '../controls/DropControl'
import { refineryRecipes } from '../data/recipes'

export class Refinery extends Rete.Component {
    constructor() {
        super('Refinery')
        this.data.component = RefineryNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output", itemSocket, false));
        node.addOutput(new Rete.Output("o2", "Output", pipeSocket, false));
        node.addControl(new DropControl(this.editor,"rec",node,false,"Recipe",refineryRecipes.name))
        node.addInput(new Rete.Input("i1","Input-1",itemSocket,false));
        node.addInput(new Rete.Input("p1","Input-2",pipeSocket,false));
        node.addInput(new Rete.Input("ovc","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        var multi = inputs['ovc'].length ? inputs['ovc'] : 1;

        var recipeInfo = refineryRecipeParser(refineryRecipes,node);
        var prc1=recipeInfo.inItem[0]==="N/A" ? 1 : 0;
        var prc2=recipeInfo.inFluid[0]==="N/A" ? 1 : 0;
        var inItemPpm = 0;
        var inFluidPpm = 0;
        if(inputs['i1'].length){
            prc1 = recipeInfo.inItem[0] === inputs['i1'][0][0] ? inputs['i1'][0][1]/recipeInfo.inItem[1] : 0;
            inItemPpm = inputs['i1'][0][1];
        }
        if(inputs['p1'].length){
            prc2 = recipeInfo.inFluid[0] === inputs['p1'][0][0] ? inputs['p1'][0][1]/recipeInfo.inFluid[1] : 0;
            inFluidPpm = inputs['p1'][0][1];
        }
        
        var prc = Math.min(prc1,prc2);
 
        var out1 = prc > 1 ? recipeInfo.outItem[1] * multi : recipeInfo.outItem[1] * multi * prc;
        outputs['o1'] = [recipeInfo.outItem[0],out1];
        var out2 = prc > 1 ? recipeInfo.outFluid[1] * multi : recipeInfo.outFluid[1] * multi * prc;
        outputs['o2'] = [recipeInfo.outFluid[0],out2];
        
        setInputMessage(node,this.editor,'i1',inItemPpm,[recipeInfo.inItem[0],recipeInfo.inItem[1]*multi]);
        setInputMessage(node,this.editor,'p1',inFluidPpm,[recipeInfo.inFluid[0],recipeInfo.inFluid[1]*multi]);
        
        setOutputMessage(node,this.editor,'o1',out1,[recipeInfo.outItem[0],recipeInfo.outItem[1]*multi]);
        setOutputMessage(node,this.editor,'o2',out2,[recipeInfo.outFluid[0],recipeInfo.outFluid[1]*multi]);  
        
    }
}

function refineryRecipeParser(recipes,node){
    let idx = recipes.name.findIndex(i=>i === node.data.rec);
    let inItem = ["N/A",0];
    let inFluid = ["N/A",0];
    let outItem = ["N/A",0];
    let outFluid= ["N/A",0];

    if(recipes.in[idx][0][2]==="item"){
        inItem = [recipes.in[idx][0][0],recipes.in[idx][0][1]];
    } else {
        inFluid = [recipes.in[idx][0][0],recipes.in[idx][0][1]];
    }
    if(recipes.in[idx].length==2){
        if(recipes.in[idx][1][2]==="item"){
            inItem = [recipes.in[idx][1][0],recipes.in[idx][1][1]];
        } else {
            inFluid = [recipes.in[idx][1][0],recipes.in[idx][1][1]];
        }
    }

    if(recipes.out[idx][0][2]==="item"){
        outItem = [recipes.out[idx][0][0],recipes.out[idx][0][1]];
    } else {
        outFluid = [recipes.out[idx][0][0],recipes.out[idx][0][1]];
    }
    if(recipes.out[idx].length==2){
        if(recipes.out[idx][1][2]==="item"){
            outItem = [recipes.out[idx][1][0],recipes.out[idx][1][1]];
        } else {
            outFluid = [recipes.out[idx][1][0],recipes.out[idx][1][1]];
        }
    }

    return {
        name: recipes.name[idx],
        inItem: inItem,
        inFluid: inFluid,
        outItem: outItem,
        outFluid: outFluid,
    }

}

export class RefineryNode extends Node {
    style = { background: "lightsalmon", borderColor: "black", opacity:"0.8"};
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
                <div className="output" key="o1" style={{float:"right"}}>
                    <Socket
                        type="output"
                        socket={outputs[0].socket}
                        io={outputs[0]}
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
                <div className="control" style={this.fontStyle}>{outputs[0].name}</div>
                <div className="control" style={this.fontStyle}>{outputs[1].name}</div>
                <div className="control" style={this.fontStyle}>{inputs[0].name}</div>
                <div className="input" key="i2" style={{float:"left"}}>
                    <Socket
                        type="input"
                        socket={inputs[1].socket}
                        io={inputs[1]}
                        innerRef={bindSocket}
                    />
                </div>
                <div className="output" key="o2" style={{float:"right"}}>
                    <Socket
                        type="output"
                        socket={outputs[1].socket}
                        io={outputs[1]}
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