import React from 'react'
//Rete
import Rete from "rete";
import { setOutputMessage, determineIndex } from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import { ButtonBarControl } from '../controls/ButtonBarControl'
import { getItemsByCat, CATS } from '../data/Items'
import { NodeBuilder } from './NodeBuilder'


export class Miner extends Rete.Component {
    constructor() {
        super('Miner')
        this.data.component = MinerNode;
        this.purity = ["Impure", "Normal", "Pure"]
        this.minerLevel = ["Mk.1", "Mk.2", "Mk.3"]
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", itemSocket, false);
        const ores = getItemsByCat(CATS.ORE);
        node.addOutput(out);
        node.addControl(new ObjectDropControl(this.editor, "item", node, false, "Item", ores));
        //node.addControl(new DropControl(this.editor, "pty", node, false,  "Purity", this.purity));
        node.addControl(new ButtonBarControl(this.editor, "pty", node, false, this.purity));
        node.addControl(new ButtonBarControl(this.editor, "min", node, false, this.minerLevel, "0em 1.2em"));
        node.addInput(new Rete.Input("i1", "Overclock", numSocket, false));
        return node;
    }

    worker(node, inputs, outputs) {
        var ptyMulti;
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
        var minMulti;
        switch (node.data.min) {
            case this.minerLevel[0]:
                minMulti = 1; break;
            case this.minerLevel[1]:
                minMulti = 2; break;
            case this.minerLevel[2]:
                minMulti = 3; break;
            default:
                minMulti = 1; break;
        }
        var out = 60 * ptyMulti * minMulti;
        out = inputs['i1'].length ? out * inputs['i1'] : out;

        const array = [node.data.item, out];
        outputs['o1'] = array;

        setOutputMessage(node, this.editor, 'o1', out, array, false);
    }
}

export class MinerNode extends Node {
    nodeTitleClass = "title-extractor";
    nodeLabel = "Mi";
    render() {
        return (
            <NodeBuilder propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel} />
        );
    }
}