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

    worker(node, outputs) {
        outputs['o1'] = node.data.ovc/100;
    }
}

class OverclockNode extends Node {
    fontStyle = {color:"white"}
    fontAndPadding = {...this.fontStyle, padding:"0px"};
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, selected } = this.state;

        return (
            <div className={`node ${selected}`}>
                <div className="two-letter-label">&nbsp;OC</div>
                <div className="title" style={this.fontStyle}>{node.name}</div>
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
            </div>
        );
    }
}