import React from 'react'
//Rete
import Rete from "rete";
import {updateInputLabel, updateOutputLabel, setLabel} from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import { ManufacturerRecipes } from '../data/Items'

export class Manufacturer extends Rete.Component {
    constructor() {
        super('Manufacturer')
        this.data.component = ManufacturerNode;
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", itemSocket, false);
        node.addOutput(out);
        node.addControl(new ObjectDropControl(this.editor,"recipe",node,false,"Recipe",ManufacturerRecipes))
        node.addInput(new Rete.Input("i1","Input-1",itemSocket,false));
        node.addInput(new Rete.Input("i2","Input-2",itemSocket,false));
        node.addInput(new Rete.Input("i3","Input-3",itemSocket,false));
        node.addInput(new Rete.Input("i4","Input-4",itemSocket,false));
        node.addInput(new Rete.Input("ovc","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        // 28-77
        var multi = inputs['ovc'].length ? inputs['ovc'] : 1;

        const in1 = inputs['i1'].length ? inputs['i1'][0] : null;
        const in2 = inputs['i2'].length ? inputs['i2'][0] : null;
        const in3 = inputs['i3'].length ? inputs['i3'][0] : null;
        const in4 = inputs['i4'].length ? inputs['i4'][0] : null;
        var calcObject = node.data.recipe.calculate([in1,in2,in3,in4],multi);
        updateInputLabel(node,this.editor,'i1',calcObject,0);
        updateInputLabel(node,this.editor,'i2',calcObject,1);
        updateInputLabel(node,this.editor,'i3',calcObject,2);
        if(node.data.recipe.inputs.length === 3){
            setLabel(node,this.editor,true,'i4','N/A');
        }else{
            updateInputLabel(node,this.editor,'i4',calcObject,3);
        }
        updateOutputLabel(node,this.editor,'o1',calcObject,0);
        outputs['o1'] = [node.data.recipe.outputs[0][0],calcObject.actualOutPpm[0]];
    }
}

export class ManufacturerNode extends Node {
    nodeTitleClass = "title-producer";
    nodeLabel = "Ma";
    fontStyle = {color:"white"}
    fontAndPadding = {...this.fontStyle, padding:"0px"};
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;

        return (
            <div className={`node ${selected}`} style={this.style}>
                <div className="two-letter-label">&nbsp;{this.nodeLabel}</div>
                <div className={this.nodeTitleClass +" title"} style={this.fontStyle}>{node.name}</div>
                <div className="control" style={this.fontAndPadding}>
                    <Control
                        className="control"
                        key={controls[0].key}
                        control={controls[0]}
                        innerRef={bindControl}
                    />
                </div>
                
                
                <div className="control" style={this.fontStyle}>{outputs[0].name}</div>
                <div className="input" key="i1" style={{float:"left", margin:"-5px"}}>
                    <Socket
                        type="input"
                        socket={inputs[0].socket}
                        io={inputs[0]}
                        innerRef={bindSocket}
                    />
                </div>
                
                
                <div className="control" style={this.fontStyle}>{inputs[0].name}</div>
                <div className="output" key="o1" style={{float:"right"}}>
                    <Socket
                        type="output"
                        socket={outputs[0].socket}
                        io={outputs[0]}
                        innerRef={bindSocket}
                    />
                </div>
                <div className="input" key="i2" style={{float:"left", margin:"-5px"}}>
                    <Socket
                        type="input"
                        socket={inputs[1].socket}
                        io={inputs[1]}
                        innerRef={bindSocket}
                    />
                </div>
                
                <div className="control" style={this.fontStyle}>{inputs[1].name}</div>
                <div className="input" key="i3" style={{float:"left", margin:"-5px"}}>
                    <Socket
                        type="input"
                        socket={inputs[2].socket}
                        io={inputs[2]}
                        innerRef={bindSocket}
                    />
                </div>
                <div className="control" style={this.fontStyle}>{inputs[2].name}</div>
                <div className="input" key="i4" style={{float:"left", margin:"-5px"}}>
                    <Socket
                        type="input"
                        socket={inputs[3].socket}
                        io={inputs[3]}
                        innerRef={bindSocket}
                    />
                </div>
                <div className="control" style={this.fontStyle}>{inputs[3].name}</div>
                <div className="control" style={{height:"0px"}}>&nbsp;</div> {/* THIS LINE FIXES AN ISSUE WITH THE OVERCLOCK SOCKET. It was getting pushed over to make room for the floating input socket above it.*/}
                <div className="input" key="ovc" style={{padding:"0px"}}>
                    <Socket
                        type="input"
                        socket={inputs[4].socket}
                        io={inputs[4]}
                        innerRef={bindSocket}
                    />
                    <div className="input-title" style={this.fontStyle}>{inputs[4].name}</div>
                </div>
            </div>
        );
    }
}