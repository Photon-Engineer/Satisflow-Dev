import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

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
        let componentGroups = this.componentArray.map(grp=> 
                <AccComp summary={<h2 className="leftbar-header">{grp.name}</h2>} content={<div className="leftbar-internal" id={grp.id}>{grp.arr.map(comp=>
                    <div className="dock-item" draggable={true} key={comp.name} onDragStart={(e)=>this.handleDrag(e,comp.name)}>{comp.name}</div>
                )}{grp.content}</div>} />
            );

        /*
        let componentPlaceholders = this.componentArray.map(comp =>
        <div className="dock-item" draggable={true} key={comp.name} onDragStart={(e)=>this.handleDrag(e,comp.name)}>{comp.name}</div>
        )
        */
        return (
        <div>
            <div className="dock-message">Click and drag components into the editor to start.</div>
            {componentGroups}
        </div>
    )}
}

class AccComp extends React.Component {
    constructor(props){
      super(props);
      this.summary = this.props.summary;
      this.content = this.props.content;
    }
    render(){
      return (
        <Accordion>
          <AccordionSummary>
            {this.summary}
          </AccordionSummary>
          <AccordionDetails>
            {this.content}
          </AccordionDetails>
        </Accordion>
      )
    }
  }