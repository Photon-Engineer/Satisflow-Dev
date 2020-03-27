import React from "react";
import Rete from "rete";
import {beltSocket} from './sockets'
import {BeltControl,NumControl,StrControl} from './NodeControls'

export class BeltComponent extends Rete.Component {
    constructor() {
      super("Belt Starter");
    }
  
    builder(node) {
      var out1 = new Rete.Output("bo1", "Output", beltSocket);
      var cs = new StrControl(this.editor,"bi1", node,false);
      var cn = new NumControl(this.editor,"bi2", node,false);
      return node.addControl(cs).addControl(cn).addOutput(out1);
    }
  
    worker(node, inputs, outputs) {
    const obj = {
        item: node.data.bi1,
        ppm: node.data.bi2
    }
      outputs["bo1"] = obj; //node.data.bo1;
    }
  }

