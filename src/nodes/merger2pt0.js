
import React from 'react'
// Rete
import Rete from "rete";
import { updateOutputLabel, determineIndex } from '../engine/helpers'
import { Node, Socket } from 'rete-react-render-plugin';
//Sockets and Controls
import { anySocket } from '../sockets/AllSockets'

export class Merger extends Rete.Component {
    constructor() {
        super('Merger')
        this.data.component = MergerNode;
    }

    builder(node) {
        node.addOutput(new Rete.Output("o1", "Output-1", anySocket, false));

        node.addInput(new Rete.Input("i1", "Input-1", anySocket, false));
        node.addInput(new Rete.Input("i2", "Input-2", anySocket, false));
        node.addInput(new Rete.Input("i3", "Input-3", anySocket, false));

        return node;
    }

    worker(node, inputs, outputs) {
        // TODO: There is no check whether all the inputs have the same item, this needs to happen. 

        var lengths = [inputs['i1'].length, inputs['i2'].length, inputs['i3'].length];

        var outppm = 0;
        outppm = lengths[0] ? outppm + inputs['i1'][0][1] : outppm;
        outppm = lengths[1] ? outppm + inputs['i2'][0][1] : outppm;
        outppm = lengths[2] ? outppm + inputs['i3'][0][1] : outppm;

        const idx = lengths.findIndex(lgt => lgt >= 1);
        var item;
        var itemName;
        switch (idx) {
            case 0:
                item = inputs['i1'][0][0]; 
                itemName = item.name;break;
            case 1:
                item = inputs['i2'][0][0]; 
                itemName = item.name;break;
            case 2:
                item = inputs['i3'][0][0];
                itemName = item.name;break;
            default:
                item = null;
                itemName = "N/A";
        }

        outputs['o1'] = [item,outppm];
        /*
        updateOutputLabel(node,this.editor,'o1',{
            recipeOutput: [itemName],
            maxOutputPpm: [0],
            actualOutPpm: [outppm],
        },0,false)
        */
        //setOutputMessage(node,this.editor,'o1',outppm,outputs['o1'],false);
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
                rotPos = ["bottom","left","top","right"];
                rotImg = "rotate(0deg)"
                break;
            case 1:
                rotPos = ["left","top","right","bottom"];
                rotImg = "rotate(90deg)"
                break;
            case 2:
                rotPos = ["top","right","bottom","left"];
                rotImg = "rotate(180deg)"
                break;
            case 3:
                rotPos = ["right","bottom","left","top"];
                rotImg = "rotate(270deg)"
                break;
        }

        return (
            <div className={"node-pane "+selected} style={{width:"100px", height:"100px"}}>
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
                            type="input"
                            socket={inputs[1].socket}
                            io={inputs[1]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className={"socket-pane-"+rotPos[2]}>
                    <div className={"socket-"+rotPos[2]}>
                        <Socket
                            type="input"
                            socket={inputs[2].socket}
                            io={inputs[2]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className={"socket-pane-"+rotPos[3]}>
                    <div className={"socket-"+rotPos[3]}>
                        <Socket
                            type="output"
                            socket={outputs[0].socket}
                            io={outputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className="content-pane" tabIndex="0" onKeyPress={this.handleRotate} style={{minWidth:"80px"}}>
                    <div className="label-pane" style={{backgroundColor:"orange", paddingTop:"5px", paddingLeft:"0px"}}>
                        <img src="./resources/arrow.png" width="80px" height="80px" style={{transform: rotImg, alignSelf:"center"}} draggable="false" />
                    </div>
                </div>
            </div>
        )
    }
}

export class MergerNode extends Node {
    nodeTitleClass = "title-producer";
    nodeLabel = "Co";
    render() {
        //tabIndex="0" onKeyDown={(e) => this.handleRotate(e)}   <-- this is how you can get a div to take focus and respond to events
        return (
            <AdjustableNodePane propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel}/>
        );
    }
}