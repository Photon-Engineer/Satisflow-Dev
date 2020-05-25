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
        this.rotArray = ["rotate(0deg)", "rotate(90deg)", "rotate(180deg)", "rotate(270deg)",]
        this.paneArray = ["lrpane","udpane"];
        this.positionArray = ["left-socket","top-socket","right-socket-pnt","bottom-socket-pnt"];
        //this.state = { transform: this.stateArray[0], }
        var iniState = this.props.propShare.node.data.rotationState === undefined ? 0 : this.props.propShare.node.data.rotationState;

        this.state = {
            pane: this.paneArray[determineIndex(0+iniState,this.paneArray.length)],
            inPos: this.positionArray[determineIndex(0+iniState,this.positionArray.length)],
            otPos: this.positionArray[determineIndex(2+iniState,this.positionArray.length)],
            rotAdj: this.rotArray[determineIndex(0+iniState,this.rotArray.length)],
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
            var idx1 = this.paneArray.findIndex((x)=> x===this.state.pane);
            idx1 = idx1 === this.paneArray.length - 1 ? 0 : ++idx1;

            var idx2 = this.positionArray.findIndex((x)=> x===this.state.inPos);
            idx2 = idx2 === this.positionArray.length - 1 ? 0 : ++idx2;

            var idx3 = this.positionArray.findIndex((x)=> x===this.state.otPos);
            idx3 = idx3 === this.positionArray.length - 1 ? 0 : ++idx3;

            var idx4 = this.rotArray.findIndex((x)=> x===this.state.rotAdj);
            idx4 = idx4 === this.rotArray.length - 1 ? 0 : ++idx4;

            this.setState({
                pane: this.paneArray[idx1],
                inPos: this.positionArray[idx2],
                otPos: this.positionArray[idx3],
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
                var idx4 = this.rotArray.findIndex((x)=> x===this.state.rotAdj);
                node.data.rotationState = idx4;
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
            <div className="node-pane" style={{width:"40px", height:"40px", borderRadius:"25px", backgroundColor:"#777"}}>
                <div className={"socket-pane "+this.state.pane}>
                    <div className={this.state.inPos}>
                        <Socket
                            type="input"
                            socket={inputs[0].socket}
                            io={inputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className={"socket-pane "+this.state.pane}>
                    <div className={this.state.otPos}>
                        <Socket
                            type="output"
                            socket={outputs[0].socket}
                            io={outputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className="content-pane" tabIndex="0" onKeyPress={this.handleRotate}>
                    <img src="./resources/arrow.png" width="20px" height="20px" style={{transform: this.state.rotAdj, alignSelf:"center",marginTop:"25%"}} draggable="false" />
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
