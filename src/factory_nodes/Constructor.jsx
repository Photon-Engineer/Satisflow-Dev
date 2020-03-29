import React from 'react'
//Rete
import Rete from "rete";
import { setOutputMessage, setInputMessage } from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { DropControl } from '../controls/DropControl'
import { constructorRecipes } from '../data/recipes'

export class Constructor extends Rete.Component {
    constructor() {
        super('Constructor')
        this.data.component = ConstructorNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output", itemSocket, false));
        node.addControl(new DropControl(this.editor, "rec", node, false, "Recipe", constructorRecipes.name))
        node.addInput(new Rete.Input("i1", "Input", itemSocket, false));
        node.addInput(new Rete.Input("ovc", "Overclock", numSocket, false));
        return node;
    }

    worker(node, inputs, outputs) {
        var multi = inputs['ovc'].length ? inputs['ovc'] : 1;

        var idx = constructorRecipes.name.findIndex(rec => rec === node.data.rec);
        var out = 0;
        var req = constructorRecipes.inppm[idx] * multi;
        if (inputs['i1'].length) {
            if (constructorRecipes.in[idx] === inputs['i1'][0][0]) {
                var prc = inputs['i1'][0][1] / req;
                out = prc > 1 ? constructorRecipes.outppm[idx] * multi : constructorRecipes.outppm[idx] * multi * prc;
            }
        }
        outputs['o1'] = [constructorRecipes.out[idx], out];

        const inpt = inputs['i1'].length ? inputs['i1'][0][1] : 0;
        const reqmt = [constructorRecipes.in[idx], constructorRecipes.inppm[idx] * multi];
        const maxout = [constructorRecipes.out[idx], constructorRecipes.outppm[idx] * multi];
        setInputMessage(node, this.editor, 'i1', inpt, reqmt);
        setOutputMessage(node, this.editor, 'o1', out, maxout);
    }
}

export class ConstructorNode extends Node {
    style = { background: "lightsalmon", borderColor: "blue", opacity:"0.8"};
    fontStyle = {color:"black"}
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;

        return (
            <div className={`node ${selected}`} style={this.style}>
                <div className="title" style={this.fontStyle}>{node.name}</div>
                <div className="control" style={this.fontStyle}>
                    <Control
                        className="control"
                        key={controls[0].key}
                        control={controls[0]}
                        innerRef={bindControl}
                    />
                </div>
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
                <div className="control" style={this.fontStyle}>{outputs[0].name}</div>
                <div className="control" style={this.fontStyle}>{inputs[0].name}</div>
                <div className="input" key="ovc">
                    <Socket
                        type="input"
                        socket={inputs[1].socket}
                        io={inputs[1]}
                        innerRef={bindSocket}
                    />
                    <div className="input-title" style={this.fontStyle}>{inputs[1].name}</div>
                </div>
            </div>
        );
    }
}
