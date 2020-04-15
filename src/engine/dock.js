import React from 'react'

export class ComponentDock extends React.Component {
    constructor (props) {
        super(props);
        this.componentArray = props.componentArray;
    }

    handleDrag(e,name) {
        if(!e.dataTransfer) return;
        e.dataTransfer.setData('componentName',name);
    }

    render() {
        let componentPlaceholders = this.componentArray.map(comp =>
        <div className="dock-item" draggable={true} onDragStart={(e)=>this.handleDrag(e,comp.name)}>{comp.name}</div>
        )
        return (
        <div>
            <div className="dock-message">Click and drag a component into the editor to add a node for that structure.</div>
            {componentPlaceholders}
        </div>
    )}
}
