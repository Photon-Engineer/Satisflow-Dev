import React from 'react'
//Rete
import Rete from "rete";
import { setOutputMessage } from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import {numSocket, pipeSocket } from '../sockets/AllSockets'
import { DropControl } from '../controls/DropControl'
import { ores, purity, minerLevel } from '../data/recipes'


export class Extractor extends Rete.Component {
    constructor() {
        super('Fluid Extractor')
        this.data.component = ExtractorNode;
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", pipeSocket, false);
        node.addOutput(out);
        node.addControl(new DropControl(this.editor, "item", node, false, "Fluid", ["Water", "Crude Oil"]));
        node.addControl(new DropControl(this.editor, "pty", node, false,  "Purity", purity));
        node.addInput(new Rete.Input("i1","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        var ptyMulti;
        switch (node.data.pty) {
            case purity[0]:
                ptyMulti = 0.5; break;
            case purity[1]:
                ptyMulti = 1; break;
            case purity[2]:
                ptyMulti = 2; break;
            default:
                ptyMulti = 1; break;
        }

        var out = 120 * ptyMulti;
        out = inputs['i1'].length ? out * inputs['i1'] : out; 

        const array = [node.data.item, out];
        outputs['o1'] = array;

        setOutputMessage(node,this.editor,'o1',out,array,false);
    }
}

export class ExtractorNode extends Node {
    style = { background: "slateblue", borderColor: "rgb(65, 65, 65)", borderWidth:"3px", opacity:"0.8"};
    fontStyle = {color:"white"}
    fontAndPadding = {...this.fontStyle, padding:"0px"};
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;

        return (
            <div className={`node ${selected}`} style={this.style}>
                <div className="title" style={this.fontStyle}>{node.name}</div>
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