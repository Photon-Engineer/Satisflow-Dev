// Final Factory Components Import
import { Miner } from '../factory_nodes/Miner'
import { Smelter } from '../factory_nodes/Smelter'
import { Constructor } from '../factory_nodes/Constructor'
import { Assembler } from '../factory_nodes/Assembler'
import { Splitter } from '../factory_nodes/StyledSplitter'
import {Merger} from '../factory_nodes/StyledMerger'
import { Overclock } from '../factory_nodes/Overclock'
// Test Components Import
import { DebugElement } from '../nodes/DebugStarterNode'
import { DebugOutputElement } from '../nodes/DebugOutputNode'

// END imports

export async function initialize(engine, editor) {
    const components = [new DebugElement(), new DebugOutputElement(), new Miner(), new Smelter(), new Constructor(), new Assembler(), new Splitter(), new Merger(), new Overclock()];
    // Register Components with the engine
    components.map(c => {
        editor.register(c);
        engine.register(c);
        return null;
    });

    // Generate starting point

    /*
    for (var i = 0; i < components.length; i++) {
        const node = await components[i].createNode();
        editor.addNode(node);
    }
    */
}