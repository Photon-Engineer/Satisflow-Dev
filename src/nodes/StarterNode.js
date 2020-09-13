import React from 'react';
//Rete
import Rete from "rete";
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import {anySocket} from '../sockets/AllSockets'
import {NumControl} from '../controls/NumControl'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import {itemObjArray} from '../data/Items'

export class Starter extends Rete.Component {
    constructor() {
        super('Creative')
        this.data.component = StarterNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1","Output",anySocket));
        node.addControl(new ObjectDropControl(this.editor,"item",node,false,"Item",itemObjArray));
        node.addControl(new NumControl(this.editor,"num",node));
        

        return node;
    }

    worker(node,inputs,outputs) {
        const array = [node.data.item,node.data.num];
        outputs['o1'] = array;
    }
}

class StarterNode extends Node {
    nodeTitleClass = "title-logistics";
    nodeLabel = "Cr";
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;
        return (
            <div className="node-pane" style={{width:"300px", height:"150px",}}>
                <div className={"socket-pane lrpane"}>
                    <div className="right-socket">
                        <Socket
                            type="output"
                            socket={outputs[0].socket}
                            io={outputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className="content-pane" style={{margin:"1% 5%"}}>
                    <div className={this.nodeTitleClass + " ti-grad title-pane"}>
                        <div className="two-letter-label">&nbsp;{this.nodeLabel}</div>
                        {node.name}
                    </div>
                    <div className="label-pane">
                        <div className="label">
                            <Control
                                className="control"
                                key={controls[0].key}
                                control={controls[0]}
                                innerRef={bindControl}
                            />
                        </div>
                        <div className="label">
                            <Control
                                className="control"
                                key={controls[1].key}
                                control={controls[1]}
                                innerRef={bindControl}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}