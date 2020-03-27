import Rete from "rete";
import { setOutputMessage } from '../engine/helpers'
//Sockets and Controls
import { itemSocket } from '../sockets/AllSockets'

export class Merger extends Rete.Component {
    constructor() {
        super('Merger')
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output-1", itemSocket, false));

        node.addInput(new Rete.Input("i1", "Input-1", itemSocket, false));
        node.addInput(new Rete.Input("i2", "Input-2", itemSocket, false));
        node.addInput(new Rete.Input("i3", "Input-3", itemSocket, false));

        return node;
    }

    worker(node, inputs, outputs) {
        // TODO: There is no check whether all the inputs have the same item, this needs to happen. 

        var lengths = [inputs['i1'].length, inputs['i2'].length, inputs['i3'].length];

        var outppm = 0;
        outppm = lengths[0] ? outppm + inputs['i1'][0][1] : outppm;
        outppm = lengths[1] ? outppm + inputs['i2'][0][1] : outppm;
        outppm = lengths[2] ? outppm + inputs['i3'][0][1] : outppm;

        const idx = lengths.findIndex(lgt => lgt >= 1);
        var item;
        switch (idx) {
            case 0:
                item = inputs['i1'][0][0]; break;
            case 1:
                item = inputs['i2'][0][0]; break;
            case 2:
                item = inputs['i3'][0][0]; break;
            default:
                item = '<NO INPUT>';
        }

        outputs['o1'] = [item,outppm];
        setOutputMessage(node,this.editor,'o1',outputs['o1']);
    }
}