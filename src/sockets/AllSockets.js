import rete from 'rete'

const itemSocket = new rete.Socket('item');
const pipeSocket = new rete.Socket('pipe');
const anySocket = new rete.Socket('any');
anySocket.combineWith(itemSocket);
anySocket.combineWith(pipeSocket);
pipeSocket.combineWith(anySocket);
itemSocket.combineWith(anySocket);
export const numSocket = new rete.Socket('number');
export const strSocket = new rete.Socket('string');
export {itemSocket};
export {pipeSocket};
export {anySocket};
