// Final Factory Components Import
import { Storage } from '../factorynodes/Storage'
//import { Splitter } from '../factorynodes/Splitter'
import { Splitter } from '../nodes/splitter2pt0'
//import { Merger } from '../factorynodes/Merger'
import { Merger } from '../nodes/merger2pt0'
import { Miner } from '../factorynodes/Miner'
import { Extractor } from '../factorynodes/Extractor'
import { Smelter } from '../factorynodes/Smelter'
import { Foundry } from '../factorynodes/Foundry'
//import { Constructor } from '../factorynodes/Constructor'
import { Assembler } from '../factorynodes/Assembler'
import { Manufacturer } from '../factorynodes/Manufacturer'
import { Refinery } from '../factorynodes/Refinery'
import { Overclock } from '../factorynodes/Overclock'
// Test Components Import
import { Starter } from '../nodes/StarterNode'
import { Constructor } from '../nodes/constructor2pt0'
// Other imports
import { ComponentDock } from './dock'
import React from 'react'
import ReactDOM from 'react-dom'
// END imports

export async function initialize(engine, editor) {
    const components = [new Miner(), new Extractor(), new Smelter(), new Foundry(), new Constructor(), new Assembler(), new Manufacturer(), new Refinery(), new Splitter(), new Merger(), new Storage(), new Starter(), new Overclock()];
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