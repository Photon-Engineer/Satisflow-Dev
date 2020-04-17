import React from 'react'
//Rete
import Rete from "rete";
import { setOutputMessage } from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import { ButtonBarControl } from '../controls/ButtonBarControl'
import { getItemsByCat, CATS } from '../data/Items'



export class Miner extends Rete.Component {
    constructor() {
        super('Miner')
        this.data.component = MinerNode;
        this.purity = ["Impure","Normal","Pure"]
        this.minerLevel = ["Mk.1","Mk.2","Mk.3"]
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", itemSocket, false);
        const ores = getItemsByCat(CATS.ORE);
        node.addOutput(out);
        node.addControl(new ObjectDropControl(this.editor, "item", node, false, "Item", ores));
        //node.addControl(new DropControl(this.editor, "pty", node, false,  "Purity", this.purity));
        node.addControl(new ButtonBarControl(this.editor,"pty",node,false,this.purity));
        node.addControl(new ButtonBarControl(this.editor, "min", node, false, this.minerLevel,"0em 1.2em"));
        node.addInput(new Rete.Input("i1","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        var ptyMulti;
        switch (node.data.pty) {
            case this.purity[0]:
                ptyMulti = 0.5; break;
            case this.purity[1]:
                ptyMulti = 1; break;
            case this.purity[2]:
                ptyMulti = 2; break;
            default:
                ptyMulti = 1; break;
        }
        var minMulti;
        switch (node.data.min) {
            case this.minerLevel[0]:
                minMulti = 1; break;
            case this.minerLevel[1]:
                minMulti = 2; break;
            case this.minerLevel[2]:
                minMulti = 3; break;
                default:
                    minMulti = 1; break;
        }
        var out = 60 * ptyMulti * minMulti;
        out = inputs['i1'].length ? out * inputs['i1'] : out; 

        const array = [node.data.item, out];
        outputs['o1'] = array;

        setOutputMessage(node,this.editor,'o1',out,array,false);
    }
}

export class MinerNode extends Node {
    fontStyle = {color:"white"}
    fontAndPadding = {...this.fontStyle, padding:"0px"};
    render() {
        const { node, bindSocket, bindControl } = this.props;
        const { outputs, controls, inputs, selected } = this.state;

        return (
            <div className={`node ${selected}`}>
                <div style={{float:"left",fontSize:"30px",color:"white",fontFamily:"Impact"}}>&nbsp;Mi</div>
                <div className="title-extractor title" style={this.fontStyle}>{node.name}</div>
                <div className="control" style={this.fontStyle}>{outputs[0].name}</div>
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
                <div className="control" style={this.fontAndPadding}>
                    <Control
                        className="control"
                        key={controls[2].key}
                        control={controls[2]}
                        innerRef={bindControl}
                    />
                </div>
                <div className="input" key="ovc">
                    <Socket
                        type="input"
                        socket={inputs[0].socket}
                        io={inputs[0]}
                        innerRef={bindSocket}
                    />
                    <div className="input-title" style={this.fontAndPadding}>{inputs[0].name}</div>
                </div>
            </div>
        );
    }
}