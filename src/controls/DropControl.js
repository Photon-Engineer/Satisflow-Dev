import React from "react";
import Rete from "rete";



export class DropControl extends Rete.Control {
    static component = ({ value, onChange, title, items }) => (
        <span>
            {title}:&nbsp;<DynamicSelect valueIn={value} onSelectChange={onChange} listItems={items} />
        </span> // to make this part dynamic, the component cannot be static.. it must be built with a function
    );

    constructor(emitter, key, node, readonly = false, title, items = ["Item 0", "Item 1", "Item 2"]) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = DropControl.component;

        const initial = node.data[key] || items[0];

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            title: title,
            items: items,
            onChange: v => {
                this.setValue(v);
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

class DynamicSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: props.valueIn };
    }

    //On the change event for the select box pass the selected value back to the parent
    handleChange = (event) => {
        let selectedValue = event.target.value;
        this.props.onSelectChange(selectedValue);
        this.setState({ value: selectedValue });
    }

    render() {
        let arrayOfData = this.props.listItems;
        let options = arrayOfData.map((data) =>
            <option value={data} key={data}>{data}</option>
        );

        return (
            //name="customSearch" className="custom-search-select"
            <select onChange={this.handleChange}>
                {options}
            </select>
        )
    }
}