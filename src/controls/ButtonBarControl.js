import React from "react";
import Rete from "rete";
// UI
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'


export class ButtonBarControl extends Rete.Control {
    static component = ({ value, onChange, items, padding }) => (
       <span>
           <ButtonBar valueIn={value} onSelectChange={onChange} listItems={items} extraPadding={padding}/>
       </span>
       
    );

    constructor(emitter, key, node, readonly = false, items, padding) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = ButtonBarControl.component;

        var initial = node.data[key] || items[0];

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            items: items,
            padding: padding,
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

var overlap = {padding:"0em 0.5em"};
var buttonToggled = {...overlap,backgroundColor:"#1581B7", color:"white"};
var buttonNotToggled = {...overlap,backgroundColor:"#E3F2Fd",color:"black"};

class ButtonBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: props.valueIn};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        let selectedValue = event.currentTarget.value;
        this.props.onSelectChange(selectedValue);
        this.setState({ value: selectedValue });
    }

    render() {
        
        let arrayOfData = this.props.listItems;
        let options = arrayOfData.map((data) => {
            var buttonStyle;
            if(data===this.state.value){
                buttonStyle = buttonToggled;
            }else{
                buttonStyle = buttonNotToggled;
            }
            if(this.props.extraPadding!==null && this.props.extraPadding!==undefined){
                buttonStyle = {...buttonStyle, padding: this.props.extraPadding};
            }
            return <Button key={data} style={buttonStyle} value={data} onClick={this.handleChange}>{data}</Button>
        }

        );
        return (
            
            <ButtonGroup variant="contained" color="primary" size="small">
                {options}
            </ButtonGroup>
        )
    }
}
