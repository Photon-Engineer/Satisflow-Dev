//Rete
import Rete from "rete";
import { setOutputMessage, setInputMessage } from '../engine/helpers'
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { DropControl } from '../controls/DropControl'
import { constructorRecipes } from '../data/recipes'

export class Constructor extends Rete.Component {
    constructor() {
        super('Constructor')
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", itemSocket, false);
        node.addOutput(out);
        node.addControl(new DropControl(this.editor,"rec",node,false,"Recipe",constructorRecipes.name))
        node.addInput(new Rete.Input("i1","Input",itemSocket,false));
        node.addInput(new Rete.Input("ovc","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        var multi = inputs['ovc'].length ? inputs['ovc'] : 1;

        var idx = constructorRecipes.name.findIndex(rec => rec === node.data.rec);
        if(inputs['i1'].length){
            if(constructorRecipes.in[idx] === inputs['i1'][0][0]){
                var req = constructorRecipes.inppm[idx] * multi;
                var prc = inputs['i1'][0][1]/req;
                var out = prc > 1 ? constructorRecipes.outppm[idx] * multi : constructorRecipes.outppm[idx] * multi * prc;
                // Set outputs
                outputs['o1'] = [constructorRecipes.out[idx],out];

            } else {
                // reject connection? 
                outputs['o1'] = ['<BAD INPUT>',0];
            }
        } else {
            outputs['o1'] = ['<NO INPUT>',0];
        }

        const inpt = inputs['i1'].length ? inputs['i1'][0] : ['',0];
        const reqmt = [constructorRecipes.in[idx],constructorRecipes.inppm[idx] * multi];
        setInputMessage(node,this.editor,'i1',inpt,reqmt)
        setOutputMessage(node,this.editor,'o1',outputs['o1']);
    }
}