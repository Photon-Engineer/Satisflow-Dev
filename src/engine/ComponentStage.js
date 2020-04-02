// Final Factory Components Import
import { Miner } from '../factory_nodes/Miner'
import { Smelter } from '../factory_nodes/Smelter'
import { Constructor } from '../factory_nodes/Constructor'
import { Assembler } from '../factory_nodes/Assembler'
import { Foundry } from '../factory_nodes/Foundry'
import { Extractor } from '../factory_nodes/Extractor'
import { Refinery } from '../factory_nodes/Refinery'
import { Splitter } from '../factory_nodes/StyledSplitter'
import {Merger} from '../factory_nodes/StyledMerger'
import {Storage} from '../factory_nodes/Storage'
import {FluidStorage} from '../factory_nodes/FluidStorage'
import { Overclock } from '../factory_nodes/Overclock'
// Test Components Import
import { DebugElement } from '../nodes/DebugStarterNode'

// END imports

export async function initialize(engine, editor) {
    const components = [new DebugElement(), new Miner(), new Smelter(), new Constructor(), new Assembler(), new Foundry(), new Extractor(), new Refinery(), new Splitter(), new Merger(), new Storage(), new FluidStorage(), new Overclock()];
    // Register Components with the engine
    components.map(c => {
        editor.register(c);
        engine.register(c);
        return null;
    });


    fetch('resources/starting_view.txt')
        .then((r) => r.json())
        .then((data) =>{
            editor.fromJSON(data);
    })
    

}