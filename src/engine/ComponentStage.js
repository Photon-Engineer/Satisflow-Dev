// Final Factory Components Import
import {Miner} from '../factory_nodes/Miner'
import {Overclock} from '../factory_nodes/Overclock'
// Test Components Import
import {DebugElement} from '../nodes/DebugStarterNode'
import {DebugOutputElement} from '../nodes/DebugOutputNode'
// END imports

export async function initialize(engine,editor){
    const components = [new DebugElement(), new DebugOutputElement(), new Miner(), new Overclock()];
    // Register Components with the engine
    components.map(c => {
        editor.register(c);
        engine.register(c);
        return null;
    });

    // Generate starting point
    

    for(var i=0;i<components.length;i++){
        const node = await components[i].createNode();
        editor.addNode(node);
    }

}