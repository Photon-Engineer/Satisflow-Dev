import React from 'react'
//Rete
import Rete from "rete";
import { setOutputMessage, styleConnections, dataTypes, determineIndex } from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import {numSocket, pipeSocket } from '../sockets/AllSockets'
import {ButtonBarControl } from '../controls/ButtonBarControl'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import { ITEMS } from '../data/Items'
import { NodeBuilder } from './NodeBuilder'


export class Extractor extends Rete.Component {
    constructor() {
        super('Fluid Extractor')
        this.data.component = ExtractorNode;
        this.purity = ["Impure","Normal","Pure"]
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", pipeSocket, false);
        node.addOutput(out);
        node.addControl(new ObjectDropControl(this.editor, "item", node, false, "Fluid", [ITEMS.Water, ITEMS.CrudeOil]));
        node.addControl(new ButtonBarControl(this.editor,"pty",node,false,this.purity));
        node.addInput(new Rete.Input("i1","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        var ptyMulti;
        if(node.data.item===ITEMS.Water) {
            ptyMulti=1;
        } else {
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
        }

        var out = 120 * ptyMulti;
        out = inputs['i1'].length ? out * inputs['i1'] : out; 

        const array = [node.data.item, out];
        outputs['o1'] = array;

        setOutputMessage(node,this.editor,'o1',out,array,false);
        styleConnections(node,this.editor,'o1',dataTypes.FLUID);
    }
}


export class ExtractorNode extends Node {
    nodeTitleClass = "title-extractor";
    nodeLabel = "Ex";
    render() {
        return (
            <NodeBuilder propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel}/>
        );
    }
}