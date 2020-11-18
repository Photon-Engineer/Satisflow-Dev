import React from 'react'
//Rete
import Rete from "rete";
import { updateInputLabel, updateOutputLabel, setLabel, determineIndex } from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { itemSocket, numSocket, pipeSocket } from '../sockets/AllSockets'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import { RefineryRecipes } from '../data/Items'
import { NodeBuilder } from './NodeBuilder'

export class Refinery extends Rete.Component {
    constructor() {
        super('Refinery')
        this.data.component = RefineryNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output", itemSocket, false));
        node.addOutput(new Rete.Output("o2", "Output", pipeSocket, false));
        node.addControl(new ObjectDropControl(this.editor,"recipe",node,false,"Recipe",RefineryRecipes))
        node.addInput(new Rete.Input("i1","Input-1",itemSocket,false));
        node.addInput(new Rete.Input("i2","Input-2",pipeSocket,false));
        node.addInput(new Rete.Input("ovc","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        var multi = inputs['ovc'].length ? inputs['ovc'] : 1;

        const in1 = inputs['i1'].length ? inputs['i1'][0] : null;
        const in2 = inputs['i2'].length ? inputs['i2'][0] : null;
        var calcObject = node.data.recipe.calculate([in1,in2],multi);
        
        setLabel(node,this.editor,true,'i1','N/A');
        setLabel(node,this.editor,true,'i2','N/A');
        setLabel(node,this.editor,false,'o1','N/A');
        setLabel(node,this.editor,false,'o2','N/A');
        // Inputs
        if(node.data.recipe.inputs[0][0].isAFluid()){
            updateInputLabel(node,this.editor,'i2',calcObject,0);
        } else {
            updateInputLabel(node,this.editor,'i1',calcObject,0);
        }
        if(node.data.recipe.inputs.length===2){
            if(node.data.recipe.inputs[1][0].isAFluid()){
                updateInputLabel(node,this.editor,'i2',calcObject,1);
            }else{
                updateInputLabel(node,this.editor,'i1',calcObject,1);
            }
        }
        // Outputs
        if(node.data.recipe.outputs[0][0].isAFluid()){
            updateOutputLabel(node,this.editor,'o2',calcObject,0);
            outputs['o2'] = [node.data.recipe.outputs[0][0],calcObject.actualOutPpm[0]];
        } else {
            updateOutputLabel(node,this.editor,'o1',calcObject,0);
            outputs['o1'] = [node.data.recipe.outputs[0][0],calcObject.actualOutPpm[0]];
        }
        if(node.data.recipe.outputs.length===2){
            if(node.data.recipe.outputs[1][0].isAFluid()){
                updateOutputLabel(node,this.editor,'o2',calcObject,1);
                outputs['o2'] = [node.data.recipe.outputs[1][0],calcObject.actualOutPpm[1]];
            }else{
                updateOutputLabel(node,this.editor,'o1',calcObject,1);
                outputs['o1'] = [node.data.recipe.outputs[1][0],calcObject.actualOutPpm[1]];
            }
        }
        
    }
}

export class RefineryNode extends Node {
    nodeTitleClass = "title-producer";
    nodeLabel = "Re";
    render() {
        return (
            <NodeBuilder propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel}/>
        );
    }
}