import React from 'react';
//Rete
import Rete from "rete";
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import {anySocket} from '../sockets/AllSockets'
import {NumControl} from '../controls/NumControl'
//import {StrControl} from '../controls/StrControl'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import {itemObjArray} from '../data/Items'
import { updateOutputLabel, updateInputLabel} from '../engine/helpers'
import { NodeBuilder } from './NodeBuilder'

import MenuItem from '@material-ui/core/MenuItem';
import {ItemSelect} from '../engine/material-ui-components'

export class InputNumber extends Rete.Component {
    constructor() {
        super('Input');
        this.module = {
            nodeType: 'input',
            socket: anySocket,
            // or
            //socket(node) {
            //    return sockets[node.data.socketType];
            //}
        }
        this.data.component = InputNode;
    }
 
    builder(node) {
        //var out = new rete.Output('output', 'Number', anySocket); // the key must be 'output'
        //var ctrl = new StrControl(this, 'name', node); // the key must be 'name'
        //var ctrl2 = new rete.FieldControl(this.editor, 'number', {type: 'number', value: 1});
        var nIn = 0;
        const nodes = this.editor.nodes;
        nodes.forEach((elem)=>{if(elem.name==="Input") nIn++})
        
        node.addOutput(new Rete.Output("output","",anySocket));
        node.addControl(new StrControl(this.editor, 'name', node,false,'Input: '+nIn));//{value: 'num'}); // the key must be 'name'
        return node
            //.addControl(ctrl)
            //.addControl(ctrl2)
            //.addOutput(out);
    }
    /*
    async worker(node, inputs, outputs) {
        const array = [node.data.item,node.data.num];
        outputs['o1'] = array;
        //if (!outputs['num'])
        //    outputs['num'] = node.data.number; // here you can modify received outputs of Input node
    }
    */
};
 
export class ModuleComponent extends Rete.Component {
 
    constructor() {
        super("Module");
        this.module = {
            nodeType: 'module'
        }
        this.data.component = ModuleNode;
    }
 
    builder(node) {
        var ctrl = new StrControl(this.editor, 'module', node,false);//{value: 'Module name..'}); // the key must be 'module'
        var ctrl = new SelectControl(this.editor, 'module', node,false); // the key must be 'module'
        ctrl.onChange = () => {
            this.updateModuleSockets(node);
            node.update();
         }
        return node.addControl(ctrl);
    }

    worker(node, inputs, outputs) {
        //console.log('here')

        //Update Output Labels
        const okeys = Object.keys(outputs);
        for(var i=0;i<okeys.length;i++) {
            if(outputs[okeys[i]][0]!==undefined){
                updateOutputLabel(node, this.editor, okeys[i], {
                    recipeOutput: [outputs[okeys[i]][0].name],
                    maxOutputPpm: [0],
                    actualOutPpm: [outputs[okeys[i]][1]],
                }, 0, false);
            }
        }
    }
 
    change(node, item) {
        node.data.module = item;
        this.editor.trigger('process');
    }
}
 
export class OutputNumber extends Rete.Component {
    constructor() {
        super('Output');
        this.module = {
            nodeType: 'output',
            socket: anySocket,
            // or
            //socket(node) {
            //   return sockets[node.data.socketType];
            //}
        }
        this.data.component = OutputNode;
    }
 
    builder(node) {
        var nOut = 0;
        const nodes = this.editor.nodes;
        nodes.forEach((elem)=>{if(elem.name==="Output") nOut++})


        var inp = new Rete.Input('input', '', anySocket); // the key must be 'input'
        var ctrl = new StrControl(this.editor, 'name', node,false,'Output '+nOut)//{value: 'num'}); // the key must be 'name'
 
        return node
            .addControl(ctrl)
            .addInput(inp);
    }
}

class InputNode extends Node {
    nodeTitleClass = "title-modules";
    nodeLabel = "In";
    render() {
        return (
            <NodeBuilder propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel} doOverclock={false}/>
        );
    }
}

export class ModuleNode extends InputNode {
    nodeTitleClass = "title-modules";
    nodeLabel = "MOD";
}

export class OutputNode extends InputNode {
    nodeTitleClass = "title-modules";
    nodeLabel = "OUT";
}

class StrControl extends Rete.Control {
    static component = ({ value, change }) => (
        <input
            type="text"
            value={value}
            size = "12"
            onChange={e => change(e.target.value)}
            onPointerMove={e => e.stopPropagation()}
        />
    );

    constructor(emitter, key, node, readonly = false,initText = '...') {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = StrControl.component;

        const initial = node.data[key] || initText;

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            change: this.change.bind(this),
        };

    }
    
    onChange() {}

    change(val) {
        this.props.value = val;
        this.update();
        this.doUpdate();
        this.onChange();
    }

    doUpdate() {
        if (this.key) this.putData(this.key, this.props.value);
        this.emitter.trigger('process');
    }

    setValue(val) {
        this.props.value = val;
        this.putData(this.key, val);
        this.doUpdate();
        this.update();
    }
}



class SelectControl extends Rete.Control {
    static component = ({value, items, change}) => (
        <ItemSelect className="item-select" value={value} autoWidth={true} onChange={(e) => change(e.target.value)}>
            {Object.keys(items).slice(1,Object.keys(items).length).map((mod)=>(<MenuItem key={mod} value={mod}>{mod}</MenuItem>))}
        </ItemSelect>
    )

    constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = SelectControl.component;
        const initial = node.data[key] || Object.keys(emitter.modules)[0];

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            items: emitter.modules,
            change: this.change.bind(this),
        };
    }

    onChange() {}

    change(val) {
        this.props.value = val;
        this.update();
        this.doUpdate();
        this.onChange();
    }

    doUpdate() {
        if (this.key) this.putData(this.key, this.props.value);
        this.emitter.trigger('process');
    }

    setValue(val) {
        this.props.value = val;
        this.putData(this.key, val);
        this.doUpdate();
        this.update();
    }
}