import React from 'react'
//Rete
import Rete from "rete";
import {StorageNode} from '../factory_nodes/Storage'
//Sockets and Controls
import {pipeSocket} from '../sockets/AllSockets'
import {NumControl} from '../controls/NumControl'
import {StrControl} from '../controls/StrControl'

export class FluidStorage extends Rete.Component {
    constructor() {
        super('Fluid Storage')
        this.data.component = FluidStorageNode;
    }

    builder(node) {
        node.addInput(new Rete.Input("i1","Input",pipeSocket));
        node.addControl(new StrControl(this.editor,"item",node,true));
        node.addControl(new NumControl(this.editor,"num",node,true));
        node.addOutput(new Rete.Output('o1','Input',pipeSocket));
        return node;
    }

    worker(node,inputs,outputs) {
        //this.editor.nodes.find(n => n.id === node.id).inputs.get("bi1").name = "Item: " + b1.item + " PPM: " + b1.ppm;
        
        outputs['o1'] = inputs['i1'].length ? inputs['i1'][0] : ['<STORAGE>',0];
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

export class FluidStorageNode extends StorageNode {
    style = { background: "darkgray", borderColor: "gray", opacity:"0.8"};
    fontStyle = {color:"white"}
    fontAndPadding = {...this.fontStyle, padding:"0px"};
}