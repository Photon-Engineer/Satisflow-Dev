//Rete
import Rete from "rete";
//Sockets and Controls
import {itemSocket} from '../sockets/AllSockets'
import {NumControl} from '../controls/NumControl'
import {StrControl} from '../controls/StrControl'

export class DebugOutputElement extends Rete.Component {
    constructor() {
        super('Display')
    }

    builder(node) {
        node.addInput(new Rete.Input("i1","Input",itemSocket));
        node.addControl(new StrControl(this.editor,"item",node,true));
        node.addControl(new NumControl(this.editor,"num",node,true));
        return node;
    }

    worker(node,inputs,outputs) {
        //this.editor.nodes.find(n => n.id === node.id).inputs.get("bi1").name = "Item: " + b1.item + " PPM: " + b1.ppm;

        const thisNode = this.editor.nodes.find(n => n.id === node.id);
        if(inputs['i1'].length) {
            thisNode.controls.get('item').setValue(inputs['i1'][0][0]);
            thisNode.controls.get('num').setValue(inputs['i1'][0][1]);
        } else {
            thisNode.controls.get('item').setValue('<NO INPUT>');
            thisNode.controls.get('num').setValue(0);
        }
    }
}