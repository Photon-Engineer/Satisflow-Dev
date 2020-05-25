import React from 'react'
//Rete
import Rete from "rete";
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { numSocket } from '../sockets/AllSockets'
import { OverclockControl } from '../controls/OverclockControl'


export class Overclock extends Rete.Component {
    constructor() {
        super('Overclock')
        this.data.component = OverclockNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output", numSocket, true));
        node.addControl(new OverclockControl(this.editor, "ovc", node, false));
        return node;
    }

    worker(node, inputs, outputs) {
        outputs['o1'] = [node.data.ovc/100];
    }
}


export class OverclockNode extends Node {
    nodeTitleClass = "title-logistics";
    nodeLabel = "Ov";
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;
        return (
            <div className="node-pane" style={{width:"200px", height:"100px",}}>
                <div className={"socket-pane lrpane"}>
                    <div className="right-socket">
                        <Socket
                            type="output"
                            socket={outputs[0].socket}
                            io={outputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className="content-pane" style={{height:"80%"}}>
                    <div className={this.nodeTitleClass + " ti-grad title-pane"}>
                        <div className="two-letter-label">&nbsp;{this.nodeLabel}</div>
                        {node.name}
                    </div>
                    <div className="label-pane">
                        <div className="label">
                            <Control
                                className="control"
                                key={controls[0].key}
                                control={controls[0]}
                                innerRef={bindControl}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
