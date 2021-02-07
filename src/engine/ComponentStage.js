// Final Factory Components Import
import { Storage } from '../nodes/storage2pt0'
//import { Splitter } from '../factorynodes/Splitter'
import { Splitter } from '../nodes/splitter2pt0'
//import { Merger } from '../factorynodes/Merger'
import { Merger } from '../nodes/merger2pt0'
import { Balancer } from '../nodes/balancer2pt0'
import { Miner } from '../nodes/miner2pt0'
import { Extractor } from '../nodes/extractor2pt0'
import { Smelter } from '../nodes/smelter2pt0'
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

import AreaPlugin from 'rete-area-plugin';
// END imports

export async function initialize(engine, editor) {
    
    const ExtractorComponents = {name:"Extraction",arr:[new Miner(), new Extractor()]};
    const SmelterComponents = {name:"Smelting",arr:[new Smelter(), new Foundry()]};
    const ProductionComponents = {name:"Production",arr:[new Constructor(), new Assembler(), new Manufacturer(), new Refinery(), new Starter()]};
    const LogisticsComponents = {name:"Logistics",arr:[new Splitter(), new Merger(), new Balancer(), new Storage(), new Overclock(), new ConnectionPoint()]};
    const ModuleComponents = {name:"Factory Modules",arr:[new InputNumber(), new ModuleComponent(), new OutputNumber()]}

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


