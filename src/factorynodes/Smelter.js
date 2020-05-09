//Rete
import Rete from "rete";
import {updateInputLabel, updateOutputLabel } from '../engine/helpers'
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import { SmelterRecipes } from '../data/Items'
//import { ConstructorNode } from './Constructor'
import { ConstructorNode } from '../nodes/constructor2pt0'

export class Smelter extends Rete.Component {
    constructor() {
        super('Smelter')
        this.data.component = SmelterNode;
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", itemSocket, false);
        node.addOutput(out);
        node.addControl(new ObjectDropControl(this.editor,"recipe",node,false,"Recipe",SmelterRecipes))
        node.addInput(new Rete.Input("i1","Input",itemSocket,false));
        node.addInput(new Rete.Input("ovc","Overclock",numSocket,false));

        return node;
    }

    worker(node, inputs, outputs) {
        var multi = inputs['ovc'].length ? inputs['ovc'] : 1;
        
        const in1 = inputs['i1'].length ? inputs['i1'][0] : null;
        var calcObject = node.data.recipe.calculate([in1],multi);
        updateInputLabel(node,this.editor,'i1',calcObject,0);
        updateOutputLabel(node,this.editor,'o1',calcObject,0);
        outputs['o1'] = [node.data.recipe.outputs[0][0],calcObject.actualOutPpm[0]];
    }
}

class SmelterNode extends ConstructorNode {
    nodeTitleClass = "title-smelter";
    nodeLabel = "Sm";
}