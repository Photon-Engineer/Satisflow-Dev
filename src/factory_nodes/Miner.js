//Rete
import Rete from "rete";
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { NumControl } from '../controls/NumControl'
import { DropControl } from '../controls/DropControl'
import { ores, purity, minerLevel } from '../data/recipes'

export class Miner extends Rete.Component {
    constructor() {
        super('Miner')
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", itemSocket, false);
        node.addOutput(out);
        node.addControl(new DropControl(this.editor, "item", node, false, "Item", ores));
        node.addControl(new DropControl(this.editor, "pty", node, false,  "Purity", purity));
        node.addControl(new DropControl(this.editor, "min", node, false, "Level", minerLevel));
        node.addInput(new Rete.Input("i1","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        var ptyMulti;
        switch (node.data.pty) {
            case purity[0]:
                ptyMulti = 0.5; break;
            case purity[1]:
                ptyMulti = 1; break;
            case purity[2]:
                ptyMulti = 2; break;
            default:
                ptyMulti = 1; break;
        }
        var minMulti;
        switch (node.data.min) {
            case minerLevel[0]:
                minMulti = 1; break;
            case minerLevel[1]:
                minMulti = 2; break;
            case minerLevel[2]:
                minMulti = 3; break;
                default:
                    minMulti = 1; break;
        }
        var out = 60 * ptyMulti * minMulti;
        out = inputs['i1'].length ? out * inputs['i1'] : out; 

        const array = new Array(node.data.item, out);
        outputs['o1'] = array;
    }
}