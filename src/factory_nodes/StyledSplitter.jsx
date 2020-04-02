import React from 'react'
//Rete
import Rete from "rete";
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
        if (nIn) {
            outputs['o1'] = [inputs['i1'][0][0], inputs['i1'][0][1] / nOut];
            outputs['o2'] = [inputs['i1'][0][0], inputs['i1'][0][1] / nOut];
            outputs['o3'] = [inputs['i1'][0][0], inputs['i1'][0][1] / nOut];
        } else {
            outputs['o1'] = ['<NO INPUT>', 0];
            outputs['o2'] = ['<NO INPUT>', 0];
            outputs['o3'] = ['<NO INPUT>', 0];
        }
    }
}

class SplitterNode extends Node {
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;
        return (
            <div className={`node ${selected}`} style={{ background: "lightgray", width: "160px", height: "160px", borderColor: "orange", opacity:"0.8"}}>
                <div className="title" style={{color:"black"}}>
                    {node.name}
                </div>
                <div key="o1" className="output" style={{ height: "40px" }}>
                    <Socket
                        type="output"
                        socket={outputs[0].socket}
                        io={outputs[0]}
                        innerRef={bindSocket}
                    />
                </div>
                <div className="input" style={{ float: "left" }} key="i1">
                    <Socket
                        type="input"
                        socket={inputs[0].socket}
                        io={inputs[0]}
                        innerRef={bindSocket}
                    /> {inputs[0].name}
                </div>
                <div className="output" style={{ height: "40px" }} key="o2">
                    Outputs&nbsp;<Socket
                        type="output"
                        socket={outputs[1].socket}
                        io={outputs[1]}
                        innerRef={bindSocket}
                    />
                </div>
                <div className="output" key="o3">
                    <Socket
                        type="output"
                        socket={outputs[2].socket}
                        io={outputs[2]}
                        innerRef={bindSocket}
                    />
                </div>
            </div>
        );
    }
}