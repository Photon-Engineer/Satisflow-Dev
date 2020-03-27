// Rete and Plugins
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import DockPlugin from "rete-dock-plugin";
import ContextMenuPlugin, { Menu, Item, Search } from 'rete-context-menu-plugin';
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
        this.editor.use(ContextMenuPlugin, {
            searchBar: false, // true by default
            searchKeep: title => true, // leave item when searching, optional. For example, title => ['Refresh'].includes(title)
            delay: 100,
        });

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

    createDock = async (container) => {
        this.editor.use(DockPlugin, {
            container: container,
            itemClass: 'dock-item',
            plugins: [ReactRenderPlugin],
        });
    }

    render() {
        return (
            <div className="editor">
                <div className="container">
                    <div ref={ref => this.createEditor(ref)} />
                </div>
                <div className="dock" ref={ref => this.createDock(ref)} />
            </div>
            /*
            <div className="App">
                <div
                    style={{ width: "100vw", height: "100vh" }}
                    ref={ref => this.createEditor(ref)}
                />
            </div>
            */
        );
    }
}

export default Editor;