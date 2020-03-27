// Rete and Plugins
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import Rete from "rete";
// React
import React, { Component } from "react";
// Custom Components
import { initialize } from './ComponentStage'

class Editor extends Component {
    createEditor = async (container) => {
        var engine = new Rete.Engine("demo@0.1.0");
        this.editor = new Rete.NodeEditor("demo@0.1.0", container);
        this.editor.use(ConnectionPlugin);
        this.editor.use(ReactRenderPlugin);

        initialize(engine, this.editor); // Register and Create Initial Components

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

    render() {
        return (
            <div className="App">
                <div
                    style={{ width: "100vw", height: "100vh" }}
                    ref={ref => this.createEditor(ref)}
                />
            </div>
        );
    }
}

export default Editor;