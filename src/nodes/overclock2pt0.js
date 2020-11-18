import React from 'react'
//Rete
import Rete from "rete";
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { numSocket } from '../sockets/AllSockets'
import { OverclockControl } from '../controls/OverclockControl'
import { NodeBuilder } from './NodeBuilder'

export class Overclock extends Rete.Component {
    constructor() {
        super('Overclock')
        this.data.component = OverclockNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "", numSocket, true));
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
        return (
            <NodeBuilder propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel} doOverclock={false}/>
        );
    }
}
