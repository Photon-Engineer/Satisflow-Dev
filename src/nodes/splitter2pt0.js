import React from 'react'
//Rete
import Rete from "rete";
import { updateOutputLabel } from '../engine/helpers'
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
        const thisNode = this.editor.nodes.find(n => n.id === node.id);
        const nIn = inputs['i1'].length ? 1 : 0;
        const nOut = thisNode.getConnections().length - nIn;
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
        this.rotArray = ["rotate(0deg)", "rotate(90deg)", "rotate(180deg)", "rotate(270deg)",]
        this.paneArray = ["lrpane", "udpane"];
        this.positionArray = ["left-socket", "top-socket", "right-socket", "bottom-socket"];
        //this.state = { transform: this.stateArray[0], }
        this.state = {
            pane: this.paneArray[0],
            inPos: this.positionArray[0],
            otPos1: this.positionArray[1],
            otPos2: this.positionArray[2],
            otPos3: this.positionArray[3],
            rotAdj: this.rotArray[0],
        }
        //this.stateArray = ["0px","20px"];
        //this.state = {margin: this.stateArray[0]};
        this.handleRotate = this.handleRotate.bind(this);
    }
    // The problem is that this component cannot be clicked because it is behind the content pane
    // So there needs to be another way to invoke this method from within this pane... hmm
    // One way around that problem is to increase the scope of this class to include the content pane as well
    //  Then the class will have direct access to the same pane that the user does, so it should be possible to invoke the method successfully.
    handleRotate = (event) => {
        if (event.key === 'r') {
            //var idx = this.stateArray.findIndex((x) => x === this.state.transform);
            //var idx = this.stateArray.findIndex((x)=>x===this.state.margin);
            //alert(idx);
            var idx1 = this.paneArray.findIndex((x) => x === this.state.pane);
            idx1 = idx1 === this.paneArray.length - 1 ? 0 : ++idx1;

            var idx2 = this.positionArray.findIndex((x) => x === this.state.inPos);
            idx2 = idx2 === this.positionArray.length - 1 ? 0 : ++idx2;

            var idx3_1 = this.positionArray.findIndex((x) => x === this.state.otPos1);
            idx3_1 = idx3_1 === this.positionArray.length - 1 ? 0 : ++idx3_1;
            var idx3_2 = this.positionArray.findIndex((x) => x === this.state.otPos2);
            idx3_2 = idx3_2 === this.positionArray.length - 1 ? 0 : ++idx3_2;
            var idx3_3 = this.positionArray.findIndex((x) => x === this.state.otPos3);
            idx3_3 = idx3_3 === this.positionArray.length - 1 ? 0 : ++idx3_3;

            var idx4 = this.rotArray.findIndex((x) => x === this.state.rotAdj);
            idx4 = idx4 === this.rotArray.length - 1 ? 0 : ++idx4;

            this.setState({
                pane: this.paneArray[idx1],
                inPos: this.positionArray[idx2],
                otPos1: this.positionArray[idx3_1],
                otPos2: this.positionArray[idx3_2],
                otPos3: this.positionArray[idx3_3],
                rotAdj: this.rotArray[idx4],
            });
            //alert(this.stateArray[idx])
            //this.setState({margin: this.stateArray[idx]});
        }
    }

    componentDidUpdate() {
        //console.log(JSON.stringify(window.rete_editor))
        try {
            setTimeout(() => {
                let node = this.props.propShare.node;
                window.rete_editor.view.updateConnections({ node });
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
        return (
            <div className="node-pane" style={{ width: "100px", height: "100px" }}>
                <div className={"socket-pane " + this.state.pane}>
                    <div className={this.state.inPos}>
                        <Socket
                            type="input"
                            socket={inputs[0].socket}
                            io={inputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className={"socket-pane " + this.state.pane}>
                    <div className={this.state.otPos1}>
                        <Socket
                            type="output"
                            socket={outputs[0].socket}
                            io={outputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className={"socket-pane " + this.state.pane}>
                    <div className={this.state.otPos2}>
                        <Socket
                            type="output"
                            socket={outputs[1].socket}
                            io={outputs[1]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className={"socket-pane " + this.state.pane}>
                    <div className={this.state.otPos3}>
                        <Socket
                            type="output"
                            socket={outputs[2].socket}
                            io={outputs[2]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className="content-pane" tabIndex="0" onKeyPress={this.handleRotate}>
                    <div className="label-pane" style={{paddingTop: "5px", paddingLeft: "0px" }}>
                        <img src="./resources/arrow.png" width="80px" height="80px" style={{ transform: this.state.rotAdj, alignSelf: "center", pointerEvents:"none"}} />
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