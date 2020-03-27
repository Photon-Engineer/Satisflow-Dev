import Rete from "rete";
import {beltSocket} from './sockets'
import {BeltControl} from './NodeControls'

class constComponent extends Rete.Component {
    constructor() {
        super("Constructor");
      }
      builder(node) {
          var i1 = new Rete.Input("bi1","Input",beltSocket);
          // add read only control
          var o1 = new Rete.Output("bo1","Output",beltSocket);
          // add read only control
          return node.addInput(i1).addOutput(o1);
      }

      worker(node,inputs,outputs) {
          //TBD
      }
}