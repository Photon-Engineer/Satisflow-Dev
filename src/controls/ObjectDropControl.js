import React from "react";
import Rete from "rete";
import MenuItem from '@material-ui/core/MenuItem';
import {ItemSelect} from '../engine/material-ui-components'
// Successor to DropControl

export class ObjectDropControl extends Rete.Control {
    static component = ({ value, onChange, title, items }) => (
        <span>
            {title}:&nbsp;<DynamicObjectSelect valueIn={value} onSelectChange={onChange} listItems={items} />
        </span> // to make this part dynamic, the component cannot be static.. it must be built with a function
    );

    constructor(emitter, key, node, readonly = false, title, items) {
        //items are expected to be objects with a "name" property
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = ObjectDropControl.component;

        var initial = node.data[key] || items[0];
        initial = items.find(item => item.name === initial.name);// Make sure initial is contains the original class methods (needed for cloning)
        //console.log(JSON.stringify(initial));

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            title: title,
            items: items,
            onChange: (val) => {
                this.setValue(val);
                this.emitter.trigger("process");
            }
        };
    }

    setValue(val) {
        this.props.value = val;
        this.putData(this.key, val);
        this.update();
    }
}

class DynamicObjectSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: props.valueIn.name };
    }

    //On the change event for the select box pass the selected value back to the parent
    handleChange = (event) => {
        let selectedValue = event.target.value;
        let idx = this.props.listItems.findIndex(i => i.name === selectedValue);
        this.props.onSelectChange(this.props.listItems[idx]);
        this.setState({ value: selectedValue });
    }

    render() {
        let arrayOfData = this.props.listItems;
        let options = arrayOfData.map((data) =>
            //<option value={data.name} key={data.name}>{data.name}</option>
            <MenuItem key={data.name} value={data.name}>{data.name}</MenuItem>
        );
        return (
            //name="customSearch" className="custom-search-select"
            /*
            <select className="dropdown-dark" onChange={this.handleChange} value={this.state.value} onPointerMove={e=>e.stopPropagation()}>
                {options}
            </select>
            
            */
            <div style={{display:"inline-block"}}>
                <ItemSelect className="item-select" value={this.state.value} autoWidth={true} onChange={this.handleChange}>{options}</ItemSelect>
            </div>
        )
    }
}