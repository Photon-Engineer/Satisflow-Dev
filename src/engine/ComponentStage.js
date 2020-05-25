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
// Other imports
import { ComponentDock } from './dock'
import React from 'react'
import ReactDOM from 'react-dom'
// END imports

export async function initialize(engine, editor) {
    const components = [new Miner(), new Extractor(), new Smelter(), new Foundry(), new Constructor(), new Assembler(), new Manufacturer(), new Refinery(), new Splitter(), new Merger(), new Storage(), new Starter(), new Overclock(), new ConnectionPoint()];
    // Register Components with the engine
    components.map(c => {
        editor.register(c);
        engine.register(c);
        return null;
    });

    const dock = <ComponentDock componentArray={components} />;
    ReactDOM.render(dock,document.querySelector('.leftbar'));

    var lz = require('lz-string');
        //var text = lz.decompressFromEncodedURIComponent(this.state.currentEditorState);
    fetch('resources/starting_view.txt')
        .then((r) => r.text())
        .then((data) =>{
            editor.fromJSON(JSON.parse(lz.decompressFromEncodedURIComponent(data)));
    })
    
    

}