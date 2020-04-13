import React from 'react'
//Rete
import Rete from "rete";
import { setOutputMessage, updateOutputLabel } from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { anySocket } from '../sockets/AllSockets'

export class Splitter extends Rete.Component {
    constructor() {
        super('Splitter')
        this.data.component = SplitterNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output-1", anySocket, false));
        node.addOutput(new Rete.Output("o2", "Output-2", anySocket, false));
        node.addOutput(new Rete.Output("o3", "Output-3", anySocket, false));
        node.addInput(new Rete.Input("i1", "Input", anySocket, false));

        return node;
    }

    worker(node, inputs, outputs) {
        const thisNode = this.editor.nodes.find(n => n.id === node.id);
        const nIn = inputs['i1'].length ? 1 : 0;
        const nOut = thisNode.getConnections().length - nIn;
        var itemName;
        var outppm;
        if (nIn) {
            if (nOut > 0) {
                outppm = inputs['i1'][0][1] / nOut;
            } else {
                outppm = inputs['i1'][0][1];
            }
            outputs['o1'] = [inputs['i1'][0][0], outppm];
            outputs['o2'] = [inputs['i1'][0][0], outppm];
            outputs['o3'] = [inputs['i1'][0][0], outppm];
            itemName = inputs['i1'][0][0].name;
        } else {
            outputs['o1'] = [null, 0];
            outputs['o2'] = [null, 0];
            outputs['o3'] = [null, 0];
            itemName = "N/A"
            outppm = 0;
        }

        updateOutputLabel(node, this.editor, 'o1', {
            recipeOutput: [itemName],
            maxOutputPpm: [0],
            actualOutPpm: [outppm],
        }, 0, false);
        //setOutputMessage(node,this.editor,'o1',inputs['i1'][0][1] / nOut,[inputs['i1'][0][0].name,0],false);
    }
}

class SplitterNode extends Node {
    nodeTitleClass = "title-logistics";
    nodeLabel = "Sp";
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;
        return (
            <div className={`node ${selected}`} style={{ background: "lightgray", borderColor: "orange", opacity: "0.8",height:"160px"}}>
                <div className="two-letter-label">&nbsp;{this.nodeLabel}</div>
                <div className={this.nodeTitleClass + " title"}>{node.name}</div>
                <div className="output" style={{ float: "right" }}>
                    <Socket
                        type="output"
                        socket={outputs[0].socket}
                        io={outputs[0]}
                        innerRef={bindSocket}
                    />
                </div>
                <div className="control" style={{ color: "white", height:"40px"}}>{outputs[0].name}</div>
                <div className="input" style={{ float: "left", color: "white" }} key="i1">
                    <Socket
                        type="input"
                        socket={inputs[0].socket}
                        io={inputs[0]}
                        innerRef={bindSocket}
                    /> {inputs[0].name}
                </div>
                <div className="output" style={{ color: "white", height:"40px"}} key="o2">
                    Outputs&nbsp;<Socket
                        type="output"
                        socket={outputs[1].socket}
                        io={outputs[1]}
                        innerRef={bindSocket}
                    />
                </div>
                <div className="output" style={{ color: "white", height:"40px"}} key="o3">
                    <Socket
                        type="output"
                        socket={outputs[2].socket}
                        io={outputs[2]}
                        innerRef={bindSocket}
                    />
                </div>
            </div>
        )
    }
}