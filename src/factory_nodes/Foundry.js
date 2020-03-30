import React from 'react'
//Rete
import Rete from "rete";
import { setOutputMessage, setInputMessage, mapToRequirement } from '../engine/helpers'
import { AssemblerNode } from '../factory_nodes/Assembler'
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { DropControl } from '../controls/DropControl'
import { foundryRecipes } from '../data/recipes'

export class Foundry extends Rete.Component {
    constructor() {
        super('Foundry')
        this.data.component = FoundryNode;
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", itemSocket, false);
        node.addOutput(out);
        node.addControl(new DropControl(this.editor,"rec",node,false,"Recipe",foundryRecipes.name))
        node.addInput(new Rete.Input("i1","Input-1",itemSocket,false));
        node.addInput(new Rete.Input("i2","Input-2",itemSocket,false));
        node.addInput(new Rete.Input("ovc","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        var multi = inputs['ovc'].length ? inputs['ovc'] : 1;

        var idx = foundryRecipes.name.findIndex(rec => rec === node.data.rec);
        var inp1req;
        var inp2req;
        var prc1 = 0;
        var prc2 = 0;
        var reqPpm;
        var mappedInputPpm = [0, 0]
        var in1complete = false;
        var in2complete = false;

        if(inputs['i1'].length){
            inp1req = mapToRequirement(inputs['i1'][0][0],foundryRecipes,idx,2)
            if(inp1req['position']>=0){
                reqPpm = inp1req['reqPpm'] * multi;
                prc1 = inputs['i1'][0][1]/reqPpm;
                mappedInputPpm[inp1req['position']] += inputs['i1'][0][1];
            }
        }
        if(inputs['i2'].length){
            inp2req = mapToRequirement(inputs['i2'][0][0],foundryRecipes,idx,2)
            if(inp2req['position']>=0){
                reqPpm = inp2req['reqPpm'] * multi;
                prc2 = inputs['i2'][0][1]/reqPpm; 
                mappedInputPpm[inp2req['position']] += inputs['i2'][0][1];
            }
        }
        
        var prc = Math.min(prc1,prc2);
        var out = prc > 1 ? foundryRecipes.outppm[idx] * multi : foundryRecipes.outppm[idx] * multi * prc;
        outputs['o1'] = [foundryRecipes.out[idx],out];

        setInputMessage(node,this.editor,'i1',mappedInputPpm[0],[foundryRecipes.in[idx],foundryRecipes.inppm[idx]*multi]);
        setInputMessage(node,this.editor,'i2',mappedInputPpm[1],[foundryRecipes.in2[idx],foundryRecipes.inppm2[idx]*multi]);

        const maxout = [foundryRecipes.out[idx],foundryRecipes.outppm[idx] * multi];
        setOutputMessage(node,this.editor,'o1',out,maxout);
        
    }
}

class FoundryNode extends AssemblerNode {
    style = { background: "lightblue", borderColor: "orange", opacity:"0.8"};
    fontStyle = {color:"black"}
    fontAndPadding = {...this.fontStyle, padding:"0px"};
}