//Rete
import Rete from "rete";
//Sockets and Controls
import { numSocket } from '../sockets/AllSockets'
import { NumControl } from '../controls/NumControl'


export class Overclock extends Rete.Component {
    constructor() {
        super('Overclock')
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output", numSocket, false));
        node.addControl(new NumControl(this.editor, "ovc", node, false));
        return node;
    }

    worker(node, inputs, outputs) {
        outputs['o1'] = node.data.ovc;
    }
}