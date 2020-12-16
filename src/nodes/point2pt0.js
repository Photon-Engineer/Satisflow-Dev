import React from 'react'
//Rete
import Rete from "rete";
import { updateInputLabel, updateOutputLabel, determineIndex} from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//Sockets and Controls
import { anySocket } from '../sockets/AllSockets'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import { ConstructorRecipes } from '../data/Items'

export class ConnectionPoint extends Rete.Component {
    constructor() {
        super('Junction')
        this.data.component = PointNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output", anySocket, false));
        node.addInput(new Rete.Input("i1", "Input", anySocket, false));
        return node;
    }

    worker(node, inputs, outputs) {
        const in1 = inputs['i1'].length ? inputs['i1'][0] : null;
        outputs['o1'] = in1;
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

        var rotPos = ["",""];
        var rotImg = "";
        switch(this.state.rotationState){
            case 0:
                rotPos = ["left","right"];
                rotImg = "rotate(0deg)"
                break;
            case 1:
                rotPos = ["top","bottom"];
                rotImg = "rotate(90deg)"
                break;
            case 2:
                rotPos = ["right","left"];
                rotImg = "rotate(180deg)"
                break;
            case 3:
                rotPos = ["bottom","top"];
                rotImg = "rotate(270deg)"
                break;
        }

        return (
            <div className="node-pane" style={{borderRadius:"25px"}}>
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
                <div className="content-pane" tabIndex="0" onKeyPress={this.handleRotate} style={{minWidth: "20px", zIndex:"4",}}>
                    <img src="./resources/arrow.png" width="20px" height="20px" style={{transform: rotImg, alignSelf:"center",marginTop:"25%"}} draggable="false" />
                </div>
            </div>
        )
    }
}

export class PointNode extends Node {
    nodeTitleClass = "title-producer";
    nodeLabel = "Co";
    render() {
        //tabIndex="0" onKeyDown={(e) => this.handleRotate(e)}   <-- this is how you can get a div to take focus and respond to events
        return (
            <AdjustableNodePane propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel}/>
        );
    }
}
