// Final Factory Components Import
import { Storage } from '../nodes/storage2pt0'
import { Splitter } from '../nodes/splitter2pt0'
import { Merger } from '../nodes/merger2pt0'
import { Balancer } from '../nodes/balancer2pt0'
import { Miner } from '../nodes/miner2pt0'
import { WaterExtractor } from '../nodes/waterExtractor2pt0'
import { OilExtractor } from '../nodes/extractor2pt0'
import { Smelter } from '../nodes/smelter2pt0'
import { Foundry } from  '../nodes/foundary2pt0'
import {Assembler} from '../nodes/assembler2pt0'
import { Manufacturer } from  '../nodes/Manufacturer2pt0'
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
import AreaPlugin from 'rete-area-plugin';
// END imports

export async function initialize(engine, editor) {
    
    const ExtractorComponents = {name:"Extraction",arr:[new Miner(), new WaterExtractor(), new OilExtractor()]};
    const SmelterComponents = {name:"Smelting",arr:[new Smelter(), new Foundry()]};
    const ProductionComponents = {name:"Production",arr:[new Constructor(), new Assembler(), new Manufacturer(), new Refinery(), new Starter()]};
    const LogisticsComponents = {name:"Logistics",arr:[new Splitter(), new Merger(), new Balancer(), new Storage(), new Overclock(), new ConnectionPoint()]};
    const ModuleComponents = {name:"Factory Modules",arr:[new InputNumber(), new ModuleComponent(), new OutputNumber()],content:<ModuleHandler editor={editor} engine={engine}/>}

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
    
    //Load initial file
    
    //var lz = require('lz-string');
        //var text = lz.decompressFromEncodedURIComponent(this.state.currentEditorState);
    //fetch('resources/starting_view.txt')
    //    .then((r) => r.text())
    //    .then((data) =>{
    //        editor.fromJSON(JSON.parse(lz.decompressFromEncodedURIComponent(data)));
    //})

    fetch('resources/Satisflow_Init.JSON')
        .then((r) => r.json())
        .then((data) =>{
            editor.fromJSON(data["Main View"]["data"]);
    })
    
    

}


class ModuleHandler extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            value: "Main View",
        };
        this.props.editor.ModuleHandlerChangeEvent = this.handleChange.bind(this);
    }
    emptyData = {id: "satisflow@0.5.0", nodes: {}};

    handleChange = (event,doSave = true) => {
        if(doSave){
            var modData = this.props.editor.modules;
            modData[this.state.value].data = this.props.editor.toJSON();
        }
        let selectedValue = event.target.value;
        //let idx = this.state.modulenames.findIndex(i => i === selectedValue);
        //this.props.onSelectChange(this.props.listItems[idx]);
        this.props.editor.currentModule = selectedValue;
        this.setState({ value: selectedValue});
    }

    createNewModule = (event) => {
        var modName = window.prompt("Enter a unique name for the module:","My Module "+Object.keys(this.props.editor.modules).length);
        if(modName===null) return;
        if(Object.keys(this.props.editor.modules).indexOf(modName)==-1){
            this.props.editor.modules[this.state.value].data = this.props.editor.toJSON();
            //modData = modData.concat(this.emptyData);
            this.props.editor.modules[modName] = {data: this.emptyData};
            this.setState({value: modName});
        } else {
            window.alert('That name is already taken!')
        }
    }

    async componentDidUpdate() {
        var data = this.props.editor.modules[this.state.value].data;
        await this.props.editor.fromJSON(data);
        this.props.editor.currentModule = this.state.value;
        //if(Object.keys(data.nodes).length === 0 && data.nodes.constructor === Object) {
        //    return;
        //}
        AreaPlugin.zoomAt(this.props.editor);
    }

    renameModule = (event) => {
        if(this.state.value==="Main View") {
            alert("Main View is not a module and cannot be renamed.");
            return;
        }
        var modName = window.prompt("Enter a new unique name for this module:",this.state.value);
        //var idx = this.state.modulenames.findIndex(i => i === this.state.value);
        // TODO add uniqueness check like above
        //var m = this.state.modulenames;
        //m[idx] = modName;
        this.props.editor.modules[modName] = {data: this.props.editor.toJSON()};
        delete this.props.editor.modules[this.state.value];
        this.setState({value: modName})
    }

    deleteModule = (event) => {
        if(this.state.value==="Main View") {
            alert("Main View is not a module and cannot be deleted.");
            return;
        }
        if(Object.keys(this.props.editor.modules).length > 1){
            delete this.props.editor.modules[this.state.value];
            this.setState({value: Object.keys(this.props.editor.modules)[0]})
        }else{
            alert('Cannot delete only module.');
        }
    }

    render() {
        return (
            <div>
                <br />
                <hr />
                <h3>Currently Viewing</h3>
                <br />
                <ItemSelect className="item-select" value={this.state.value} autoWidth={true} onChange={this.handleChange}>
                    {Object.keys(this.props.editor.modules).map(mod => <MenuItem key={mod} value={mod}>{mod}</MenuItem>)}
                </ItemSelect>
                <br />
                <BlueButton variant="contained" color="primary" onClick={this.createNewModule}>Create New</BlueButton>
                <BlueButton variant="contained" color="primary" onClick={this.renameModule}>Rename</BlueButton>
                <BlueButton variant="contained" color="primary" onClick={this.deleteModule}>Delete</BlueButton>
            </div>
        )
    }
}