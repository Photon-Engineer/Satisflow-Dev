import React from 'react'
//Rete
import Rete from "rete";
import { updateOutputLabel, determineIndex } from '../engine/helpers'
import { Node, Socket } from 'rete-react-render-plugin';
//Sockets and Controls
import { anySocket } from '../sockets/AllSockets'

export class Splitter extends Rete.Component {
    constructor() {
        super('Splitter')
        this.data.component = SplitterNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output-1", anySocket, false));
        node.addOutput(new Rete.Output("o2", "Output-2", anySocket, false));
        node.addOutput(new Rete.Output("o3", "Output-3", anySocket, false));
        node.addInput(new Rete.Input("i1", "Input", anySocket, false));

        return node;
    }

    worker(node, inputs, outputs) {
        //const thisNode = this.editor.nodes.find(n => n.id === node.id);
        const nIn = inputs['i1'].length ? 1 : 0;
        //const nOut = thisNode.getConnections().length - nIn;
        var nOut = 0;
        nOut += node.outputs.o1.connections.length;
        nOut += node.outputs.o2.connections.length;
        nOut += node.outputs.o3.connections.length;

        var itemName;
        var outppm;
        if (nIn) {
            if (nOut > 0) {
                outppm = inputs['i1'][0][1] / nOut;
            } else {
                outppm = inputs['i1'][0][1];
            }
            outputs['o1'] = [inputs['i1'][0][0], outppm];
            outputs['o2'] = [inputs['i1'][0][0], outppm];
            outputs['o3'] = [inputs['i1'][0][0], outppm];
            itemName = inputs['i1'][0][0].name;
        } else {
            outputs['o1'] = [null, 0];
            outputs['o2'] = [null, 0];
            outputs['o3'] = [null, 0];
            itemName = "N/A"
            outppm = 0;
        }

        updateOutputLabel(node, this.editor, 'o1', {
            recipeOutput: [itemName],
            maxOutputPpm: [0],
            actualOutPpm: [outppm],
        }, 0, false);
        //setOutputMessage(node,this.editor,'o1',inputs['i1'][0][1] / nOut,[inputs['i1'][0][0].name,0],false);
    }
}

class AdjustableNodePane extends React.Component {
    constructor(props) {
        super(props);
        var iniState = this.props.propShare.node.data.rotationState === undefined ? 0 : this.props.propShare.node.data.rotationState;
        this.state = {
            rotationState: iniState,
        }
        this.handleRotate = this.handleRotate.bind(this);
    }
    handleRotate = (event) => {
        if (event.key === 'r') {
            this.setState({
                rotationState: determineIndex(this.state.rotationState+1,4),
            });
        }
    }

    componentDidUpdate() {
        try {
            setTimeout(() => {
                let node = this.props.propShare.node;
                window.rete_editor.view.updateConnections({ node });
                node.data.rotationState = this.state.rotationState;
            }, 1000);

        } catch {
            return;
        }
    }

    render() {
        const nodeTitleClass = this.props.nodeTitleClass;
        const nodeLabel = this.props.nodeLabel;
        const { node, bindSocket, bindControl } = this.props.propShare;
        const { outputs, controls, inputs, selected } = this.props.stateShare;
        
        var rotPos = ["","","",""];
        var rotImg = "";
        switch(this.state.rotationState){
            case 0:
                rotPos = ["left","top","right","bottom"];
                rotImg = "rotate(0deg)"
                break;
            case 1:
                rotPos = ["top","right","bottom","left"];
                rotImg = "rotate(90deg)"
                break;
            case 2:
                rotPos = ["right","bottom","left","top"];
                rotImg = "rotate(180deg)"
                break;
            case 3:
                rotPos = ["bottom","left","top","right"];
                rotImg = "rotate(270deg)"
                break;
        }
        
        
        return (
            <div className="node-pane" style={{ width: "100px", height: "100px" }}>
                <div className={"socket-pane-"+rotPos[0]}>
                    <div className={"socket-"+rotPos[0]}>
                        <Socket
                            type="input"
                            socket={inputs[0].socket}
                            io={inputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className={"socket-pane-"+rotPos[1]}>
                    <div className={"socket-"+rotPos[1]}>
                        <Socket
                            type="output"
                            socket={outputs[0].socket}
                            io={outputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className={"socket-pane-"+rotPos[2]}>
                    <div className={"socket-"+rotPos[2]}>
                        <Socket
                            type="output"
                            socket={outputs[1].socket}
                            io={outputs[1]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className={"socket-pane-"+rotPos[3]}>
                    <div className={"socket-"+rotPos[3]}>
                        <Socket
                            type="output"
                            socket={outputs[2].socket}
                            io={outputs[2]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className="content-pane" tabIndex="0" onKeyPress={this.handleRotate} style={{minWidth:"80px", }}>
                    <div className="label-pane" style={{paddingTop: "5px", paddingLeft: "0px"}}>
                        <img src="./resources/arrow.png" width="80px" height="80px" style={{ transform: rotImg, alignSelf: "center", pointerEvents:"none"}} />
                    </div>
                </div>
            </div>
        )
    }
}

export class SplitterNode extends Node {
    nodeTitleClass = "title-producer";
    nodeLabel = "Co";
    render() {
        //tabIndex="0" onKeyDown={(e) => this.handleRotate(e)}   <-- this is how you can get a div to take focus and respond to events
        return (
            <AdjustableNodePane propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel} />
        );
    }
}