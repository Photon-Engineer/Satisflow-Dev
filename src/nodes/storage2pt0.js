import React from 'react'
//Rete
import Rete from "rete";
import { Node, Socket, Control } from 'rete-react-render-plugin';
import {determineIndex} from '../engine/helpers';
//Sockets and Controls
import {anySocket} from '../sockets/AllSockets'
import {NumControl} from '../controls/NumControl'
import {StrControl} from '../controls/StrControl'
import { NodeBuilder } from './NodeBuilder'

export class Storage extends Rete.Component {
    constructor() {
        super('Storage')
        this.data.component = StorageNode;
    }

    builder(node) {
        node.addInput(new Rete.Input("i1","",anySocket));
        node.addControl(new StrControl(this.editor,"item",node,true));
        node.addControl(new NumControl(this.editor,"num",node,true));
        node.addOutput(new Rete.Output('o1',"",anySocket));
        return node;
    }

    worker(node,inputs,outputs) {
        
        outputs['o1'] = inputs['i1'].length ? inputs['i1'][0] : [null,0];
        const thisNode = this.editor.nodes.find(n => n.id === node.id);
        if(inputs['i1'].length) {
            thisNode.controls.get('item').setValue(inputs['i1'][0][0].name);
            thisNode.controls.get('num').setValue(inputs['i1'][0][1]);
        } else {
            thisNode.controls.get('item').setValue('<NO INPUT>');
            thisNode.controls.get('num').setValue(0);
        }
    }
}


export class StorageNode extends Node {
    nodeTitleClass = "title-logistics";
    nodeLabel = "St";
    render() {
        //tabIndex="0" onKeyDown={(e) => this.handleRotate(e)}   <-- this is how you can get a div to take focus and respond to events
        return (
            <NodeBuilder propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel} doOverclock={false}/>
        );
    }
}