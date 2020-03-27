import React from "react";
import Rete from "rete";
import { MyNode } from "./MyNode";

var numSocket = new Rete.Socket("Number");

class NumControl extends Rete.Control {
  static component = ({ value, onChange }) => (
    <input
      type="number"
      value={value}
      onChange={e => onChange(+e.target.value)}
      onPointerMove={e => e.stopPropagation()}
    /> // This is the normal NumControl... for my purposes, I could just add a label after this to display the item name.
  );

  constructor(emitter, key, node, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = NumControl.component;

    const initial = node.data[key] || 0;

    node.data[key] = initial;
    this.props = {
      readonly,
      value: initial,
      onChange: v => {
        this.setValue(v);
        this.emitter.trigger("process");
      }
    };
  }

  setValue(val) {
    this.props.value = val;
    this.putData(this.key, val);
    this.update();
  }
  
}

class BeltControl extends Rete.Control {
  static component = ({ value, onChange }) => ( // for my case the "value" will be an object, so I'll need to use value.item and value.ppm or something...
    <div> 
      <label>Value.item(Placeholder)</label><input type="number" value={value} onChange={e => onChange(+e.target.value)} onPointerMove={e => e.stopPropagation()} />
    </div>
  );

  constructor(emitter, key, node, readonly = false) {
    super(key);
    this.emitter = emitter;
    this.key = key;
    this.component = BeltControl.component;

    const initial = node.data[key] || 0;

    node.data[key] = initial;
    this.props = {
      readonly,
      value: initial,
      onChange: v => {
        this.setValue(v);
        this.emitter.trigger("process");
      }
    };
  }

  setValue(val) {
    this.props.value = val;
    this.putData(this.key, val);
    this.update();
  }
}

export class NumComponent extends Rete.Component {
  constructor() {
    super("Number");
  }

  builder(node) {
    var out1 = new Rete.Output("num", "Number", numSocket);
    var ctrl = new NumControl(this.editor, "num", node);
    return node.addControl(ctrl).addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs["num"] = node.data.num;
  }
}

export class AddComponent extends Rete.Component {
  constructor() {
    super("Add");
    this.data.component = MyNode;
  }

  builder(node) {
    var inp1 = new Rete.Input("num1", "Number", numSocket);
    var inp2 = new Rete.Input("num2", "Number2", numSocket);
    var inp3 = new Rete.Input("num3", "Number3", numSocket);
    var out = new Rete.Output("num", "Number", numSocket);

    inp1.addControl(new NumControl(this.editor, "num1", node));
    inp2.addControl(new NumControl(this.editor, "num2", node));
    inp3.addControl(new NumControl(this.editor, "num3", node));

    return node
      .addInput(inp1)
      .addInput(inp2)
      .addInput(inp3)
      .addControl(new NumControl(this.editor, "preview", node, true))
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
    var n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
    var n3 = inputs["num3"].length ? inputs["num3"][0] : node.data.num3;
    var sum = n1 + n2 + n3;

    this.editor.nodes
      .find(n => n.id === node.id)
      .controls.get("preview")
      .setValue(sum);
    outputs["num"] = sum;
  }
}


export class Const extends Rete.Component {
  constructor() {
    super("Constructer - Iron Plates")
  }
  builder(node) {
    const inp1 = new Rete.Input("bi1", "Iron Ingot", numSocket);
    inp1.addControl(new NumControl(this.editor, "bi1", node));
    const multCtrl = new NumControl(this.editor, "Multiplier", node, false);
    const out1 = new Rete.Output("bo1", "Iron Plate", numSocket);
    const prev = new NumControl(this.editor, "Preview", node, true);

    return node
      .addInput(inp1)
      .addControl(multCtrl)
      .addControl(prev)
      .addOutput(out1)

  }

  worker(node, inputs, outputs) {
    var b1 = inputs["bi1"].length ? inputs["bi1"][0] : node.data.bi1;
    var o1 = b1 >= 30 ? 20 : b1 / 30 * 20;

    this.editor.nodes
      .find(n => n.id === node.id)
      .controls.get("Preview")
      .setValue(o1);
    outputs["bo1"] = o1; // this is where you put the output. I can define a new socket, and then use object outputs {item: "Iron Ore", PerMin: 30} for the result!
    // Then this worker function would know how to handle that type of input!
  }
}

export class OutDispComponent extends Rete.Component {
  constructor() {
    super("Output")
  }

  builder(node) {
    const inp1 = new Rete.Input("bi1", "Output", numSocket);
    return node
      .addInput(inp1)
      .addControl(new NumControl(this.editor, "Preview", node, true));
  }

  worker(node, inputs, outputs) {
    var b1 = inputs["bi1"].length ? inputs["bi1"][0] : 0;
    this.editor.nodes
      .find(n => n.id === node.id)
      .controls.get("Preview")
      .setValue(b1);
  }
}


export class SplitterComponent extends Rete.Component { // Note: This repo had an example of how to put nodes on all sides... https://github.com/Alibriaan/FlowChart
  constructor() {
    super("Splitter");
  }

  builder(node) {
    const inp1 = new Rete.Input("bi1", "Input", numSocket);
    inp1.addControl(new NumControl(this.editor, "bi1", node, false));
    const o1 = new Rete.Output("bo1", "Out 1", numSocket);
    const o2 = new Rete.Output("bo2", "Out 2", numSocket);
    const o3 = new Rete.Output("bo3", "Out 3", numSocket);
    return node
      .addInput(inp1)
      .addOutput(o1)
      .addOutput(o2)
      .addOutput(o3)
  }

  worker(node, inputs, outputs) {
    const i1 = inputs["bi1"].length ? inputs["bi1"][0] : node.data.bi1;

    var oc = this.editor.nodes.find(n => n.id === node.id).getConnections().length; // something like this may provide the result I need. Technically, all I need is the total number of connections. I should be able to figure out the rest from there pretty easily. 

    if (inputs["bi1"].length) {
      oc--;
    }
    var out = 0;
    switch (oc) {
      case 0:
        out = 0;
        break;
      case 1:
        out = i1;
        break;
      case 2:
        out = i1 / 2;
        break;
      case 3:
        out = i1 / 3;
        break;
      default:
        break;
    }

    outputs["bo1"] = out;
    outputs["bo2"] = out;
    outputs["bo3"] = out;

  }
}