//Rete
import Rete from "rete";
import { setOutputMessage, setInputMessage } from '../engine/helpers'
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { DropControl } from '../controls/DropControl'
import { smelterRecipes } from '../data/recipes'
import { ConstructorNode } from './Constructor'

export class Smelter extends Rete.Component {
    constructor() {
        super('Smelter')
        this.data.component = SmelterNode;
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", itemSocket, false);
        node.addOutput(out);
        node.addControl(new DropControl(this.editor,"rec",node,false,"Recipe",smelterRecipes.name))
        node.addInput(new Rete.Input("i1","Input",itemSocket,false));
        node.addInput(new Rete.Input("ovc","Overclock",numSocket,false));

        return node;
    }

    worker(node, inputs, outputs) {
        var multi = inputs['ovc'].length ? inputs['ovc'] : 1;
        var out = 0
        var idx = smelterRecipes.name.findIndex(rec => rec === node.data.rec);
        if(inputs['i1'].length){
            if(smelterRecipes.in[idx] === inputs['i1'][0][0]){
                var req = smelterRecipes.inppm[idx] * multi;
                var prc = inputs['i1'][0][1]/req;
                out = prc > 1 ? smelterRecipes.outppm[idx] * multi : smelterRecipes.outppm[idx] * multi * prc;
            }
        }
        outputs['o1'] =[smelterRecipes.out[idx],out];
        const inpt = inputs['i1'].length ? inputs['i1'][0][1] : 0;
        const reqmt = [smelterRecipes.in[idx],smelterRecipes.inppm[idx] * multi];
        const maxout = [smelterRecipes.out[idx],smelterRecipes.outppm[idx]*multi];
        setInputMessage(node,this.editor,'i1',inpt,reqmt);
        setOutputMessage(node,this.editor,'o1',out,maxout);
    }
}

class SmelterNode extends ConstructorNode {
    style = { background: "lightblue", borderColor: "blue", opacity:"0.8"};
}