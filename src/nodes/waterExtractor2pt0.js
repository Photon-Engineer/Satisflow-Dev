import React from 'react'
//Rete
import Rete from "rete";
import { setOutputMessage, styleConnections, dataTypes, determineIndex } from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import {numSocket, pipeSocket } from '../sockets/AllSockets'
import { NodeBuilder } from './NodeBuilder'
import { ITEMS } from '../data/Items'


export class WaterExtractor extends Rete.Component {
    constructor() {
        super('Water Extractor')
        this.data.component = ExtractorNode;
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", pipeSocket, false);
        node.addOutput(out);
        node.addInput(new Rete.Input("i1","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        var out = 120;
        out = inputs['i1'].length ? out * inputs['i1'] : out; 

        const array = [ITEMS.Water, out];
        outputs['o1'] = array;

        setOutputMessage(node,this.editor,'o1',out,array,false);
        styleConnections(node,this.editor,'o1',dataTypes.FLUID);
    }
}


class ExtractorNode extends Node {
    nodeTitleClass = "title-extractor";
    nodeLabel = "Ex";
    render() {
        return (
            <NodeBuilder propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel}/>
        );
    }
}