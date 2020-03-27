//Rete
import Rete from "rete";
//Sockets and Controls
import { itemSocket} from '../sockets/AllSockets'

export class Splitter extends Rete.Component {
    constructor() {
        super('Splitter')
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output-1", itemSocket, false));
        node.addOutput(new Rete.Output("o2", "Output-2", itemSocket, false));
        node.addOutput(new Rete.Output("o3", "Output-3", itemSocket, false));
        node.addInput(new Rete.Input("i1","Input",itemSocket,false));

        return node;
    }

    worker(node, inputs, outputs) {
        const thisNode = this.editor.nodes.find(n => n.id === node.id);
        const nIn = inputs['i1'].length ? 1 : 0;
        const nOut = thisNode.getConnections().length - nIn;
        if(nIn){
            outputs['o1'] = [inputs['i1'][0][0],inputs['i1'][0][1]/nOut];
            outputs['o2'] = [inputs['i1'][0][0],inputs['i1'][0][1]/nOut];
            outputs['o3'] = [inputs['i1'][0][0],inputs['i1'][0][1]/nOut];
        } else {
            outputs['o1'] = ['<NO INPUT>',0];
            outputs['o2'] = ['<NO INPUT>',0];
            outputs['o3'] = ['<NO INPUT>',0];
        }
    }
}