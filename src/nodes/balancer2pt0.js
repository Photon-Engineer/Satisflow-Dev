import React from 'react'
//Rete
import Rete from "rete";
import { updateOutputLabel, updateInputLabel, determineIndex } from '../engine/helpers'
import { Node, Socket } from 'rete-react-render-plugin';
//Sockets and Controls
import { anySocket } from '../sockets/AllSockets'
import { NodeBuilder } from './NodeBuilder'

export class Balancer extends Rete.Component {
    constructor() {
        super('Balancer')
        this.data.component = BalancerNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output", anySocket, true));
        node.addInput(new Rete.Input("i1", "Input", anySocket, true));

        return node;
    }

    worker(node, inputs, outputs) {
        const nIn = inputs['i1'].length ? inputs['i1'].length : 0;
        const nOut = node.outputs.o1.connections.length;

        var itemName;
        var inppm = 0;
        var outppm = 0;

        if (nIn && (inputs['i1'][0]!==undefined)) {
            inputs['i1'].forEach((inp)=>inppm=inppm+inp[1]);
            if (nOut > 0) {
                outppm = inppm / nOut;
            } else {
                outppm = inppm;
            }
            if (nOut){
                outputs['o1'] = [inputs['i1'][0][0], outppm];
            }
            //outputs['o1'] = [inputs['i1'][0][0], outppm];
            itemName = inputs['i1'][0][0].name;
        } else {
            if (nOut) {
                outputs['o1'] = [null, outppm];
            }
            itemName = "N/A"
            outppm = 0;
        }
        updateInputLabel(node, this.editor, 'i1', {
            recipeInputs: [itemName],
            recipeReqPpm: [0],
            actualInpPpm: [inppm],
        }, 0, false);
        updateOutputLabel(node, this.editor, 'o1', {
            recipeOutput: [itemName],
            maxOutputPpm: [0],
            actualOutPpm: [outppm],
        }, 0, false);
    }
}


export class BalancerNode extends Node {
    nodeTitleClass = "title-logistics";
    nodeLabel = "BL";
    render() {
        return (
            <NodeBuilder propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel} doOverclock={false}/>
        );
    }
}