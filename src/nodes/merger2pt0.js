
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
        updateOutputLabel(node,this.editor,'o1',{
            recipeOutput: [itemName],
            maxOutputPpm: [0],
            actualOutPpm: [outppm],
        },0,false)
        //setOutputMessage(node,this.editor,'o1',outppm,outputs['o1'],false);
    }
}

class AdjustableNodePane extends React.Component {
    constructor(props) {
        super(props);
        this.rotArray = ["rotate(0deg)", "rotate(90deg)", "rotate(180deg)", "rotate(270deg)",]
        this.paneArray = ["lrpane","udpane"];
        this.positionArray = ["left-socket","top-socket","right-socket","bottom-socket"];

        var iniState = this.props.propShare.node.data.rotationState === undefined ? 0 : this.props.propShare.node.data.rotationState;
        //this.state = { transform: this.stateArray[0], }
        this.state = {
            pane: this.paneArray[determineIndex(iniState+ 0,this.paneArray.length)],
            inPos1: this.positionArray[determineIndex(iniState+1,this.positionArray.length)],
            inPos2: this.positionArray[determineIndex(iniState+0,this.positionArray.length)],
            inPos3: this.positionArray[determineIndex(iniState+3,this.positionArray.length)],
            otPos: this.positionArray[determineIndex(iniState+2,this.positionArray.length)],
            rotAdj: this.rotArray[determineIndex(iniState+0,this.rotArray.length)],
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

            var idx2_1 = this.positionArray.findIndex((x)=> x===this.state.inPos1);
            idx2_1 = idx2_1 === this.positionArray.length - 1 ? 0 : ++idx2_1;
            var idx2_2 = this.positionArray.findIndex((x)=> x===this.state.inPos2);
            idx2_2 = idx2_2 === this.positionArray.length - 1 ? 0 : ++idx2_2;
            var idx2_3 = this.positionArray.findIndex((x)=> x===this.state.inPos3);
            idx2_3 = idx2_3 === this.positionArray.length - 1 ? 0 : ++idx2_3;

            var idx3 = this.positionArray.findIndex((x)=> x===this.state.otPos);
            idx3 = idx3 === this.positionArray.length - 1 ? 0 : ++idx3;

            

            var idx4 = this.rotArray.findIndex((x)=> x===this.state.rotAdj);
            idx4 = idx4 === this.rotArray.length - 1 ? 0 : ++idx4;

            this.setState({
                pane: this.paneArray[idx1],
                inPos1: this.positionArray[idx2_1],
                inPos2: this.positionArray[idx2_2],
                inPos3: this.positionArray[idx2_3],
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
            <div className="node-pane" style={{width:"100px", height:"100px"}}>
                <div className={"socket-pane "+this.state.pane}>
                    <div className={this.state.inPos1}>
                        <Socket
                            type="input"
                            socket={inputs[0].socket}
                            io={inputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className={"socket-pane "+this.state.pane}>
                    <div className={this.state.inPos2}>
                        <Socket
                            type="input"
                            socket={inputs[1].socket}
                            io={inputs[1]}
                            innerRef={bindSocket}
                        />
                    </div>
                </div>
                <div className={"socket-pane "+this.state.pane}>
                    <div className={this.state.inPos3}>
                        <Socket
                            type="input"
                            socket={inputs[2].socket}
                            io={inputs[2]}
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
                    <div className="label-pane" style={{backgroundColor:"orange", paddingTop:"5px", paddingLeft:"0px"}}>
                        <img src="./resources/arrow.png" width="80px" height="80px" style={{transform: this.state.rotAdj, alignSelf:"center"}} draggable="false" />
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