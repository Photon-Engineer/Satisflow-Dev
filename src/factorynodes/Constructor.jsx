import React from 'react'
//Rete
import Rete from "rete";
import { updateInputLabel, updateOutputLabel } from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import { ConstructorRecipes } from '../data/Items'

export class Constructor extends Rete.Component {
    constructor() {
        super('Constructor')
        this.data.component = ConstructorNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output", itemSocket, false));
        node.addControl(new ObjectDropControl(this.editor, "recipe", node, false, "Recipe", ConstructorRecipes))
        node.addInput(new Rete.Input("i1", "Input", itemSocket, false));
        node.addInput(new Rete.Input("ovc", "Overclock", numSocket, false));
        return node;
    }

    worker(node, inputs, outputs) {
        var multi = inputs['ovc'].length ? inputs['ovc'] : 1;

        const in1 = inputs['i1'].length ? inputs['i1'][0] : null;
        var calcObject = node.data.recipe.calculate([in1],multi);
        updateInputLabel(node,this.editor,'i1',calcObject,0);
        updateOutputLabel(node,this.editor,'o1',calcObject,0);
        outputs['o1'] = [node.data.recipe.outputs[0][0],calcObject.actualOutPpm[0]];
    }
}

export class ConstructorNode extends Node {
    nodeTitleClass = "title-producer";
    nodeLabel = "Co";
    fontStyle = {color:"white"};
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
