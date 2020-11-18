import React from 'react'
import { updateInputLabel, updateOutputLabel, determineIndex} from '../engine/helpers'
import { Node, Socket, Control } from 'rete-react-render-plugin';

export class NodeBuilder extends React.Component {
    constructor(props){
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
        const doOvc = (this.props.doOverclock === undefined || this.props.doOverclock === true) ? true : false;
        var inPos = "";
        var outPos = "";
        var flexdir = "";
        switch(this.state.rotationState){
            case 0:
                inPos = "left";
                outPos = "right";
                break;
            case 1:
                inPos = "top";
                outPos = "bottom";
                break;
            case 2:
                inPos = "right";
                outPos = "left";
                break;
            case 3:
                inPos = "bottom";
                outPos = "top";
                break;
        }

        var inSockets = inputs.map((elem)=>
            <Socket
                type="input"
                socket={elem.socket}
                io={elem}
                innerRef={bindSocket}
            />);
        let outSockets = outputs.map((elem)=>
                <Socket
                    type="output"
                    socket={elem.socket}
                    io={elem}
                    innerRef={bindSocket}
                />);
        let inLabels = inputs.map((elem)=>
            <div className="label">{elem.name}</div>);
        let outLabels = outputs.map((elem)=>
            <div className="label">{elem.name}</div>);
        let inControls = controls.map((elem)=>
            <Control
            className="control"
            key={elem.key}
            control={elem}
            innerRef={bindControl}
            />
        )

        var ovcSocket = null;
        if(doOvc && inSockets.length>0){
            ovcSocket = inSockets[inSockets.length-1];
            ovcSocket = <div className="ovc-pane">{ovcSocket}&nbsp;Overclock</div>;
            inSockets = inSockets.slice(0,inSockets.length-1);
            inLabels = inLabels.slice(0,inLabels.length-1);
        }


        return (
            <div className="node-pane">
                <div className={"socket-pane-"+inPos}>
                    <div className={"socket-"+inPos}>
                        {inSockets}
                    </div>
                </div>
                <div className={"socket-pane-"+outPos}>
                    <div className={"socket-"+outPos}>
                        {outSockets}
                    </div>
                </div>
                <div className="content-pane" tabIndex="0" onKeyPress={this.handleRotate}>
                    <div className={nodeTitleClass + " title-pane"}>
                        <div className="two-letter-label">&nbsp;{nodeLabel}</div>
                        {node.name}
                    </div>
                    <div className="label-pane">
                        {inControls[0]}
                        {inLabels}
                        {outLabels}
                        {inControls.slice(1,inControls.length)}
                    </div>
                    {ovcSocket}
                </div>
            </div>
        )
    }
}