//Rete
import Rete from "rete";
//Sockets and Controls
import {anySocket} from '../sockets/AllSockets'
import {NumControl} from '../controls/NumControl'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import {itemObjArray} from '../data/Items'

export class Starter extends Rete.Component {
    constructor() {
        super('Creative')
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1","Output",anySocket));
        node.addControl(new ObjectDropControl(this.editor,"item",node,false,"Item",itemObjArray));
        node.addControl(new NumControl(this.editor,"num",node));
        

        return node;
    }

    worker(node,inputs,outputs) {
        const array = [node.data.item,node.data.num];
        outputs['o1'] = array;
    }
}