import React from 'react'
//Rete
import Rete from "rete";
import { updateInputLabel, updateOutputLabel, determineIndex} from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import { ConstructorRecipes } from '../data/Items'
import { NodeBuilder } from './NodeBuilder'

export class Constructor extends Rete.Component {
    constructor() {
        super('Constructor')
        this.data.component = ConstructorNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output", itemSocket, false));
        node.addControl(new ObjectDropControl(this.editor, "recipe", node, false, "Recipe", ConstructorRecipes))
        node.addInput(new Rete.Input("i1", "Input", itemSocket, false));
        node.addInput(new Rete.Input("ovc", "Overclock", numSocket, false));
        return node;
    }

    worker(node, inputs, outputs) {

        var multi = inputs['ovc'].length ? inputs['ovc'] : 1;

        const in1 = inputs['i1'].length ? inputs['i1'][0] : null;
        var calcObject = node.data.recipe.calculate([in1], multi);
        updateInputLabel(node, this.editor, 'i1', calcObject, 0);
        updateOutputLabel(node, this.editor, 'o1', calcObject, 0);
        outputs['o1'] = [node.data.recipe.outputs[0][0], calcObject.actualOutPpm[0]];
    }
}

export class ConstructorNode extends Node {
    nodeTitleClass = "title-producer";
    nodeLabel = "Co";
    render() {
        return (
            <NodeBuilder propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel}/>
        );
    }
}
