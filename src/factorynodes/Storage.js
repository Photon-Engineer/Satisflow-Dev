import React from 'react'
//Rete
import Rete from "rete";
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import {anySocket} from '../sockets/AllSockets'
import {NumControl} from '../controls/NumControl'
import {StrControl} from '../controls/StrControl'

export class Storage extends Rete.Component {
    constructor() {
        super('Storage')
        this.data.component = StorageNode;
    }

    builder(node) {
        node.addInput(new Rete.Input("i1","Input",anySocket));
        node.addControl(new StrControl(this.editor,"item",node,true));
        node.addControl(new NumControl(this.editor,"num",node,true));
        node.addOutput(new Rete.Output('o1','Output',anySocket));
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
    fontStyle = {color:"white"}
    fontAndPadding = {...this.fontStyle, padding:"0px"};
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;

        return (
            <div className={`node ${selected}`} style={this.style}>
                <div className="two-letter-label">&nbsp;{this.nodeLabel}</div>
                <div className={this.nodeTitleClass +" title"} style={this.fontStyle}>{node.name}</div>
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