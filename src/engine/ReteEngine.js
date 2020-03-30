// Rete and Plugins
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import ContextMenuPlugin, { Menu, Item, Search } from 'rete-context-menu-plugin';
import Rete from "rete";
// React
import React, { Component } from "react";
// Custom Components
import { initialize } from './ComponentStage';
import '../backgroundStyle.sass';
//import { } from '../nodes/ReactNodeTest'

class Editor extends Component {
    createEditor = async (container) => {
        this.engine = new Rete.Engine("satisflow@0.5.0");
        this.editor = new Rete.NodeEditor("satisflow@0.5.0", container);
        this.editor.use(ConnectionPlugin);
        this.editor.use(ReactRenderPlugin);
        this.editor.use(ContextMenuPlugin, {
            searchBar: false, // true by default
            searchKeep: title => true, // leave item when searching, optional. For example, title => ['Refresh'].includes(title)
            delay: 100,
        });

        container.classList.add('custom-node-editor');
        const background = document.createElement('div');
        background.classList = 'background';
        this.editor.use(AreaPlugin, {background});

        initialize(this.engine, this.editor); // Register and Create Initial Components

        this.editor.on(
            "process nodecreated noderemoved connectioncreated connectionremoved",
            async () => {
                await this.engine.abort();
                await this.engine.process(this.editor.toJSON());
            }
        );
        
        this.editor.view.resize();
        this.editor.trigger("process");
        AreaPlugin.zoomAt(this.editor, this.editor.nodes);
    }
    /*  dock plugin attempt... didn't work
    createDock = async (container) => {
        this.editor.use(DockPlugin, {
            container: container,
            itemClass: 'dock-item',
            plugins: [ReactRenderPlugin],
        });
    }
    */

    render() {
        return (
            /* dock plugin attempt... didn't work
            <div className="editor">
                <div className="container">
                    <div ref={ref => this.createEditor(ref)} />
                </div>
                <div className="dock" ref={ref => this.createDock(ref)} />
            </div>
            */

            <div className="App">
                <div className = "editor"
                    style={{ width: "100vw", height: "80vh"}}
                    ref={ref => this.createEditor(ref)}
                />
                <div style={{ height: "90px", backgroundColor: "#212F3D" }}>
                    <SaveLoadComponent mainEditor={this} />
                </div>
            </div>

        );
    }
}


class SaveLoadComponent extends React.Component {

    constructor(props) {
        super(props);
        this.mainEditor = this.props.mainEditor;
        this.state = { currentEditorState: "Click the Get JSON button to retrieve the current state of the editor." };
        this.handleLoad = this.handleLoad.bind(this);
        this.handleStore = this.handleStore.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleStore() {
        const text = JSON.stringify(this.mainEditor.editor.toJSON());
        this.setState({ currentEditorState: text })
    }

    handleLoad() {
        var json="";
        try {
            json = JSON.parse(this.state.currentEditorState);
        } catch(err) {
            alert(err.message);
        } finally {
            if(json){
                this.mainEditor.editor.fromJSON(json);    
            }
        }
    }

    handleChange(event) {
        this.setState({ currentEditorState: event.target.value })
    }

    async applyToEditor(thisobj, json) {
        await thisobj.mainEditor.engine.abort();
        await thisobj.mainEditor.engine.process(json);
    }


    render() {
        return (
            <aside>
                <div>
                    <div>
                        <button onClick={this.handleStore}>Get JSON</button>
                    </div>
                    <div>
                        <button onClick={this.handleLoad}>Load JSON</button>
                    </div>
                </div>
                <textarea rows="4" columns="50" style={{width:"1300px",height:"40px"}} value={this.state.currentEditorState} onChange={this.handleChange} />
            </aside>
        )
    }
}



export default Editor;