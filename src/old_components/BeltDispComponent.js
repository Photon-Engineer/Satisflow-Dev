import Rete from "rete";
import {beltSocket} from './sockets'
import {BeltControl} from './NodeControls'

export class BeltDispComponent extends Rete.Component {
    constructor() {
        super("Output Display");
      }
      builder(node) {
          var i1 = new Rete.Input("bi1","Display",beltSocket);
          //var ct = new BeltControl(this.editor,"Prev",node,true);
          // add read only controls
          return node.addInput(i1);//.addControl(ct);
      }

      worker(node,inputs,outputs) {
        var b1 = inputs["bi1"].length ? inputs["bi1"] : {item:"<NO_ITEM>", ppm: 0};
        //alert(JSON.stringify(b1));
        //node.controls.get("Prev").setValue(b1);
        //alert(JSON.stringify(node));
        //var k = new Rete.Node;
        //k.inputs.get("x").name

        
        this.editor.nodes.find(n => n.id === node.id).inputs.get("bi1").name = "Item: " + b1.item + " PPM: " + b1.ppm;
        /*
        this.editor.nodes
          .find(n => n.id === node.id)
          .controls.get("Prev")
          .setValue(b1);
        */
        
      }
}