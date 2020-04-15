// Final Factory Components Import
import { Storage } from '../factorynodes/Storage'
import { Splitter } from '../factorynodes/Splitter'
import { Merger } from '../factorynodes/Merger'
import { Miner } from '../factorynodes/Miner'
import { Extractor } from '../factorynodes/Extractor'
import { Smelter } from '../factorynodes/Smelter'
import { Foundry } from '../factorynodes/Foundry'
import { Constructor } from '../factorynodes/Constructor'
import { Assembler } from '../factorynodes/Assembler'
import { Manufacturer } from '../factorynodes/Manufacturer'
import { Refinery } from '../factorynodes/Refinery'
import { Overclock } from '../factorynodes/Overclock'
// Test Components Import
import { Starter } from '../nodes/StarterNode'
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


    fetch('resources/starting_view.txt')
        .then((r) => r.json())
        .then((data) =>{
            editor.fromJSON(data);
    })
    

}