import React from 'react'
//Rete
import Rete from "rete";
import { setOutputMessage } from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import {numSocket, pipeSocket } from '../sockets/AllSockets'
import { DropControl } from '../controls/DropControl'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import { ITEMS } from '../data/Items'


export class Extractor extends Rete.Component {
    constructor() {
        super('Fluid Extractor')
        this.data.component = ExtractorNode;
        this.purity = ["Impure","Normal","Pure"]
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", pipeSocket, false);
        node.addOutput(out);
        node.addControl(new ObjectDropControl(this.editor, "item", node, false, "Fluid", [ITEMS.Water, ITEMS.CrudeOil]));
        node.addControl(new DropControl(this.editor, "pty", node, false,  "Purity", this.purity));
        node.addInput(new Rete.Input("i1","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        var ptyMulti;
        if(node.data.item===ITEMS.Water) {
            ptyMulti=1;
        } else {
            switch (node.data.pty) {
                case this.purity[0]:
                    ptyMulti = 0.5; break;
                case this.purity[1]:
                    ptyMulti = 1; break;
                case this.purity[2]:
                    ptyMulti = 2; break;
                default:
                    ptyMulti = 1; break;
            }
        }

        var out = 120 * ptyMulti;
        out = inputs['i1'].length ? out * inputs['i1'] : out; 

        const array = [node.data.item, out];
        outputs['o1'] = array;

        setOutputMessage(node,this.editor,'o1',out,array,false);
    }
}

export class ExtractorNode extends Node {
    fontStyle = {color:"white"}
    fontAndPadding = {...this.fontStyle, padding:"0px"};
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;

        return (
            <div className={`node ${selected}`}>
                <div style={{float:"left",fontSize:"30px",color:"white",fontFamily:"Impact"}}>&nbsp;Ex</div>
                <div className="title-extractor title" style={this.fontStyle}>{node.name}</div>
                <div className="control" style={this.fontStyle}>{outputs[0].name}</div>
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
                <div className="control" style={this.fontAndPadding}>
                    <Control
                        className="control"
                        key={controls[1].key}
                        control={controls[1]}
                        innerRef={bindControl}
                    />
                </div>
                <div className="input" key="ovc">
                    <Socket
                        type="input"
                        socket={inputs[0].socket}
                        io={inputs[0]}
                        innerRef={bindSocket}
                    />
                    <div className="input-title" style={this.fontAndPadding}>{inputs[0].name}</div>
                </div>
            </div>
        );
    }
}