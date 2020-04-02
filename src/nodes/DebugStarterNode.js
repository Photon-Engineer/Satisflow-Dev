//Rete
import Rete from "rete";
//Sockets and Controls
import {anySocket} from '../sockets/AllSockets'
import {NumControl} from '../controls/NumControl'
import {DropControl} from '../controls/DropControl'
import {allItems} from '../data/recipes'

export class DebugElement extends Rete.Component {
    constructor() {
        super('Starter')
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1","Output",anySocket));
        node.addControl(new DropControl(this.editor,"item",node,false,"item",allItems));
        node.addControl(new NumControl(this.editor,"num",node));
        

        return node;
    }

    worker(node,inputs,outputs) {
        //console.log(node.data.item);
        const array = new Array(node.data.item,node.data.num);
        outputs['o1'] = array;
    }
}