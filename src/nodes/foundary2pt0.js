import React from 'react'
//Rete
import Rete from "rete";
import {updateInputLabel, updateOutputLabel, determineIndex} from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';
//import { AssemblerNode } from './Assembler'
//Sockets and Controls
import { itemSocket, numSocket } from '../sockets/AllSockets'
import { ObjectDropControl } from '../controls/ObjectDropControl'
import { FoundryRecipes } from '../data/Items'

export class Foundry extends Rete.Component {
    constructor() {
        super('Foundry')
        this.data.component = FoundryNode;
    }

    builder(node) {
        const out = new Rete.Output("o1", "Output", itemSocket, false);
        node.addOutput(out);
        node.addControl(new ObjectDropControl(this.editor,"recipe",node,false,"Recipe",FoundryRecipes))
        node.addInput(new Rete.Input("i1","Input-1",itemSocket,false));
        node.addInput(new Rete.Input("i2","Input-2",itemSocket,false));
        node.addInput(new Rete.Input("ovc","Overclock",numSocket,false));
        return node;
    }

    worker(node, inputs, outputs) {
        var multi = inputs['ovc'].length ? inputs['ovc'] : 1;

        const in1 = inputs['i1'].length ? inputs['i1'][0] : null;
        const in2 = inputs['i2'].length ? inputs['i2'][0] : null;
        var calcObject = node.data.recipe.calculate([in1,in2],multi);
        updateInputLabel(node,this.editor,'i1',calcObject,0);
        updateInputLabel(node,this.editor,'i2',calcObject,1);
        updateOutputLabel(node,this.editor,'o1',calcObject,0);
        outputs['o1'] = [node.data.recipe.outputs[0][0],calcObject.actualOutPpm[0]];
    }
}

class AdjustableNodePane extends React.Component {
    constructor(props) {
        super(props);
        this.rotArray = ["rotate(0deg)", "rotate(90deg)", "rotate(180deg)", "rotate(270deg)",]
        this.paneArray = ["lrpane","udpane"];
        this.positionArray = ["left-socket","top-socket","right-socket","bottom-socket"];
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
            <div className="node-pane" style={{width:"288px",height:"288px"}}>
                <div className={"socket-pane "+this.state.pane}>
                    <div className={this.state.inPos}>
                        <Socket
                            type="input"
                            socket={inputs[0].socket}
                            io={inputs[0]}
                            innerRef={bindSocket}
                        />
                    </div>
                    <div className={this.state.inPos}>
                        <Socket
                            type="input"
                            socket={inputs[1].socket}
                            io={inputs[1]}
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
                    <div className={nodeTitleClass + " ti-grad title-pane"}>
                        <div className="two-letter-label">&nbsp;{nodeLabel}</div>
                        {node.name}
                    </div>
                    <div className="label-pane">
                        <Control
                            className="control"
                            key={controls[0].key}
                            control={controls[0]}
                            innerRef={bindControl}
                        />
                        <div className="label">{inputs[0].name}</div>
                        <div className="label">{inputs[1].name}</div>
                        <div className="label">{outputs[0].name}</div>
                    </div>
                    <div className="ovc-pane">
                        <Socket
                            type="input"
                            socket={inputs[2].socket}
                            io={inputs[2]}
                            innerRef={bindSocket}
                        />&nbsp;Overclock
                    </div>
                </div>
            </div>
        )
    }
}

export class FoundryNode extends Node {
    nodeTitleClass = "title-smelter";
    nodeLabel = "Fo";
    render() {
        //tabIndex="0" onKeyDown={(e) => this.handleRotate(e)}   <-- this is how you can get a div to take focus and respond to events
        return (
            <AdjustableNodePane propShare={this.props} stateShare={this.state} nodeTitleClass={this.nodeTitleClass} nodeLabel={this.nodeLabel}/>
        );
    }
}