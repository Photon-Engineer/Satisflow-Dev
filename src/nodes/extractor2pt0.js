import React from 'react'
//Rete
import Rete from "rete";
import { setOutputMessage, styleConnections, dataTypes } from '../engine/helpers'
import { Node } from 'rete-react-render-plugin';
//Sockets and Controls
import { numSocket, pipeSocket } from '../sockets/AllSockets'
import { ButtonBarControl } from '../controls/ButtonBarControl'
import { NodeBuilder } from './NodeBuilder'
import { ITEMS } from '../data/Items'


export class OilExtractor extends Rete.Component {
    constructor() {
        super('Oil Extractor')
        this.data.component = ExtractorNode;
        this.purity = ["Impure", "Normal", "Pure"]
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", pipeSocket, false);
        node.addOutput(out);
        node.addControl(new ButtonBarControl(this.editor, "pty", node, false, this.purity));
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


        var out = 120 * ptyMulti;
        out = inputs['i1'].length ? out * inputs['i1'] : out;

        const array = [ITEMS.CrudeOil, out];
        outputs['o1'] = array;

        setOutputMessage(node, this.editor, 'o1', out, array, false);
        styleConnections(node, this.editor, 'o1', dataTypes.FLUID);
    }
}


class ExtractorNode extends Node {
    nodeTitleClass = "title-extractor";
    nodeLabel = "Ex";
    render() {
        return (
            <NodeBuilder propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel} />
        );
    }
}