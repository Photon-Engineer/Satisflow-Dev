//import React from 'react';
import { anySocket } from '../sockets/AllSockets'
import {StrControl} from '../controls/StrControl'
import rete from 'rete'

export class InputNumber extends rete.Component {
    constructor() {
        super('InputX');
        this.module = {
            nodeType: 'input',
            socket: anySocket,
            // or
            //socket(node) {
            //    return sockets[node.data.socketType];
            //}
        }
    }
 
    builder(node) {
        var out = new rete.Output('output', 'Number', anySocket); // the key must be 'output'
        var ctrl = new StrControl(this, 'name', node); // the key must be 'name'
        //var ctrl2 = new rete.FieldControl(this.editor, 'number', {type: 'number', value: 1});
        
        return node
            .addControl(ctrl)
            //.addControl(ctrl2)
            .addOutput(out);
    }
 
    async worker(node, inputs, outputs) {
        if (!outputs['num'])
            outputs['num'] = node.data.number; // here you can modify received outputs of Input node
    }
};
 
export class ModuleComponent extends rete.Component {
 
    constructor() {
        super("Module");
        this.module = {
            nodeType: 'module'
        }
    }
 
    builder(node) {
        var ctrl = new StrControl(this.editor, 'module', {value: 'Module name..'}); // the key must be 'module'
        ctrl.onChange = () => {
            this.updateModuleSockets(node);
            node.update();
         }
        return node//.addControl(ctrl);
    }
 
    change(node, item) {
        node.data.module = item;
        this.editor.trigger('process');
    }
}
 
export class OutputNumber extends rete.Component {
    constructor() {
        super('OutputX');
        this.module = {
            nodeType: 'output',
            socket: anySocket,
            // or
            //socket(node) {
            //   return sockets[node.data.socketType];
            //}
        }
    }
 
    builder(node) {
        var inp = new rete.Input('input', 'Number', anySocket); // the key must be 'input'
        var ctrl = new StrControl(this.editor, 'name', {value: 'num'}); // the key must be 'name'
 
        return node
            //.addControl(ctrl)
            .addInput(inp);
    }
}