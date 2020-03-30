import React from 'react'
//Rete
import Rete from "rete";
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import {itemSocket} from '../sockets/AllSockets'
import {NumControl} from '../controls/NumControl'
import {StrControl} from '../controls/StrControl'

export class Storage extends Rete.Component {
    constructor() {
        super('Storage')
        this.data.component = StorageNode;
    }

    builder(node) {
        node.addInput(new Rete.Input("i1","Input",itemSocket));
        node.addControl(new StrControl(this.editor,"item",node,true));
        node.addControl(new NumControl(this.editor,"num",node,true));
        node.addOutput(new Rete.Output('o1','Input',itemSocket));
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

export class StorageNode extends Node {
    style = { background: "lightgray", borderColor: "gray", opacity:"0.8"};
    fontStyle = {color:"black"}
    fontAndPadding = {...this.fontStyle, padding:"0px"};
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;

        return (
            <div className={`node ${selected}`} style={this.style}>
                <div className="title" style={this.fontStyle}>{node.name}</div>
                <div className="input" key="i1" style={{float:"left"}}>
                    <Socket
                        type="input"
                        socket={inputs[0].socket}
                        io={inputs[0]}
                        innerRef={bindSocket}
                    />
                </div>
                <div className="output" key="o1" style={{float:"right"}}>
                    <Socket
                        type="output"
                        socket={outputs[0].socket}
                        io={outputs[0]}
                        innerRef={bindSocket}
                    />
                </div>
                <div className="control" style={this.fontAndPadding}>
                    <Control
                        className="control"
                        key={controls[0].key}
                        control={controls[0]}
                        innerRef={bindControl}
                    />
                </div>
                <div className="control" style={this.fontAndPadding}>
                    <Control
                        className="control"
                        key={controls[1].key}
                        control={controls[1]}
                        innerRef={bindControl}
                    />
                </div>
            </div>
        );
    }
}