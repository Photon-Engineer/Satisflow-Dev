import React, {Component} from "react";
import { NumComponent, AddComponent, Const , OutDispComponent, SplitterComponent} from "./Editor";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import Rete from "rete";
import {data} from './data';
import {BeltComponent} from '../components/BeltComponent'
import {BeltDispComponent} from '../components/BeltDispComponent'

class Editor extends Component {

	createEditor = async (container) => {
		//var components = [new NumComponent(), new AddComponent(), new Const(), new OutDispComponent(), new SplitterComponent(), new BeltComponent()];
		var components = [new BeltComponent(), new BeltDispComponent()];
		this.editor = new Rete.NodeEditor("demo@0.1.0", container);
		this.editor.use(ConnectionPlugin);
		this.editor.use(ReactRenderPlugin);

		var engine = new Rete.Engine("demo@0.1.0");

		components.map(c => {
			this.editor.register(c);
			engine.register(c);
			return null;
		});
		const blt1 = await components[0].createNode({item: "Test", ppm: 10});
		this.editor.addNode(blt1);

		const d1 = await components[1].createNode();
		this.editor.addNode(d1);
		//const const1 = new Const();
		//this.editor.addNode(const1);
		/*
		var num = await components[0].createNode({num: 5});
		this.editor.addNode(num);

		var c1 = await components[2].createNode();
		this.editor.addNode(c1);

		for(var i=0;i<3;i++){
			const o = await components[3].createNode();
			this.editor.addNode(o);
		}

		//var o1 = await components[3].createNode();
		//this.editor.addNode(o1);

		var s1 = await components[4].createNode();
		this.editor.addNode(s1);
		*/
		//await this.editor.fromJSON(data)
		
		engine.on('error', ({ message, data }) => { alert(message) });
		
		
		this.editor.on(
		"process nodecreated noderemoved connectioncreated connectionremoved",
			async () => {
				await engine.abort();
				await engine.process(this.editor.toJSON());
			}
		);
		

		this.editor.view.resize();
		this.editor.trigger("process");
		AreaPlugin.zoomAt(this.editor, this.editor.nodes);
	}

	render(){
		return (
	    <div className="App">
	      <div
	        style={{ width: "100vw", height: "80vh" }}
	        ref={ref => this.createEditor(ref)}
	      />
	    </div>
	  );
	}
}

export default Editor;