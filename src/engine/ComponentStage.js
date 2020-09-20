// Final Factory Components Import
import { Storage } from '../nodes/storage2pt0'
//import { Splitter } from '../factorynodes/Splitter'
import { Splitter } from '../nodes/splitter2pt0'
//import { Merger } from '../factorynodes/Merger'
import { Merger } from '../nodes/merger2pt0'
import { Miner } from '../nodes/miner2pt0'
import { Extractor } from '../nodes/extractor2pt0'
import { Smelter } from '../factorynodes/Smelter'
//import { Foundry } from '../factorynodes/Foundry'
import { Foundry } from  '../nodes/foundary2pt0'
//import { Constructor } from '../factorynodes/Constructor'
//import { Assembler } from '../factorynodes/Assembler'
import {Assembler} from '../nodes/assembler2pt0'
//import { Manufacturer } from '../factorynodes/Manufacturer'
import { Manufacturer } from  '../nodes/Manufacturer2pt0'
//import { Refinery } from '../factorynodes/Refinery'
import { Refinery } from '../nodes/refinery2pt0'
import { Overclock } from '../nodes/overclock2pt0'
// Test Components Import
import { Starter } from '../nodes/StarterNode'
import { Constructor } from '../nodes/constructor2pt0'
import { ConnectionPoint } from '../nodes/point2pt0'
import {InputNumber, ModuleComponent, OutputNumber} from '../nodes/modules'
// Other imports
import { ComponentDock } from './dock'
import React from 'react'
import ReactDOM from 'react-dom'
import { BlueButton } from './material-ui-components'
import MenuItem from '@material-ui/core/MenuItem';
import {ItemSelect} from '../engine/material-ui-components'
// END imports

export async function initialize(engine, editor) {
    
    const ExtractorComponents = {name:"Extraction",arr:[new Miner(), new Extractor()]};
    const SmelterComponents = {name:"Smelting",arr:[new Smelter(), new Foundry()]};
    const ProductionComponents = {name:"Production",arr:[new Constructor(), new Assembler(), new Manufacturer(), new Refinery(), new Starter()]};
    const LogisticsComponents = {name:"Logistics",arr:[new Splitter(), new Merger(), new Storage(), new Overclock(), new ConnectionPoint()]};
    const ModuleComponents = {name:"Custom Modules",arr:[new InputNumber(), new ModuleComponent(), new OutputNumber()],content:<ModuleHandler />}

    const components = ExtractorComponents.arr.concat(SmelterComponents.arr, ProductionComponents.arr, LogisticsComponents.arr,ModuleComponents.arr);
    // Register Components with the engine
    components.map(c => {
        editor.register(c);
        engine.register(c);
        return null;
    });

    const componentGroups = [ExtractorComponents,SmelterComponents,ProductionComponents,LogisticsComponents,ModuleComponents];

    const dock = <ComponentDock componentArray={componentGroups} />;
    ReactDOM.render(dock,document.querySelector('.leftbar'));
    

    var lz = require('lz-string');
        //var text = lz.decompressFromEncodedURIComponent(this.state.currentEditorState);
    fetch('resources/starting_view.txt')
        .then((r) => r.text())
        .then((data) =>{
            editor.fromJSON(JSON.parse(lz.decompressFromEncodedURIComponent(data)));
    })
    
    

}


class ModuleHandler extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            value: "Main View",
            modulenames: ["Main View"]
        };
    }

    handleChange = (event) => { // TODO FIX THIS
        let selectedValue = event.target.value;
        let idx = this.state.modulenames.findIndex(i => i.name === selectedValue);
        //this.props.onSelectChange(this.props.listItems[idx]);
        this.setState({ value: selectedValue });
    }

    createNewModule = (event) => {
        var modName = window.prompt("Enter a unique name for the module:","My Module 1");
        this.setState({modulenames: this.state.modulenames.concat(modName)})
    }

    render() {
        return (
            <div>
                <br />
                <hr />
                <h3>Currently Viewing</h3>
                <br />
                <ItemSelect className="item-select" value={this.state.value} autoWidth={true} onChange={this.handleChange}>
                    {this.state.modulenames.map(mod => <MenuItem key={mod} value={mod}>{mod}</MenuItem>)}
                </ItemSelect>
                <BlueButton variant="contained" color="primary" onClick={this.createNewModule}>Create New</BlueButton>
                <BlueButton variant="contained" color="primary" onClick={this.renameModule}>Rename</BlueButton>
                <BlueButton variant="contained" color="primary" onClick={this.deleteModule}>Delete</BlueButton>
            </div>
        )
    }
}