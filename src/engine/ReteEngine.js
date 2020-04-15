// Rete and Plugins
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import DockPlugin from "rete-dock-plugin"
import AreaPlugin from "rete-area-plugin";
import ContextMenuPlugin, { Menu, Item, Search } from 'rete-context-menu-plugin';
import Rete from "rete";
// React
import React, { Component } from "react";
import ReactDOM from 'react-dom';
// Custom Components
import { initialize } from './ComponentStage';
import '../backgroundStyle.sass';

class Editor extends Component {
    constructor(props){
        super(props);
        this.editor = null;
        this.engine = null;
    }
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
        this.editor.use(DockPlugin,{
            container: document.querySelector('.leftbar'),
            itemClass: 'dock-item',
            plugins: [ReactRenderPlugin]
        });

        container.classList.add('custom-node-editor');
        const background = document.createElement('div');
        background.classList = 'background';
        this.editor.use(AreaPlugin, { background });

        initialize(this.engine, this.editor); // Register and Create Initial Components

        this.editor.on('error',err=>alert(err));

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

        await ReactDOM.render(<SaveLoadComponent mainEditor={this} />,document.querySelector('.right-menu'));
    }

    render() {
        return (
           <div ref={ref => this.createEditor(ref)} />
        );
    }
}


export default Editor;

class SaveLoadComponent extends React.Component {

    constructor(props) {
        super(props);
        this.mainEditor = this.props.mainEditor;
        this.state = { currentEditorState: "Click the Get JSON button to retrieve the current state of the editor." };
        this.handleLoad = this.handleLoad.bind(this);
        this.handleStore = this.handleStore.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.abort = this.abort.bind(this);
    }
  
    handleStore() {
        //const YAML = require('yamljs');
        //const text = YAML.stringify(this.mainEditor.editor.toJSON());
        const text = JSON.stringify(this.mainEditor.editor.toJSON());
        this.setState({ currentEditorState: text })
    }
  
    handleLoad() {
        var json = "";
        //const YAML = require('yamljs');
        try {
            //json = YAML.parse(this.state.currentEditorState);
            json = JSON.parse(this.state.currentEditorState);
        } catch (err) {
            alert(err.message);
        } finally {
            if (json) {
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
  
    async abort(){
        await this.mainEditor.engine.abort();
    }
  
    handleRefresh(){
        //this.mainEditor.editor.fromJSON(this.mainEditor.editor.toJSON());
        var thisJson = this.mainEditor.editor.toJSON();
        var storedJson = JSON.stringify(thisJson);
        thisJson.nodes = {}
        this.mainEditor.editor.fromJSON(thisJson);
        alert('Refreshing editor.')
        this.mainEditor.editor.fromJSON(JSON.parse(storedJson));
    }
  
    handleClear(){
        this.abort();
        var thisJson = this.mainEditor.editor.toJSON();
        thisJson.nodes = {}
        this.mainEditor.editor.fromJSON(thisJson);
    }

    render() {
        return (
            <div className="right-menu">
                <div>
                    <button onClick={this.handleStore}>Export Data</button>
                </div>
                <textarea rows="4" columns="50" style={{ width: "150px", height: "600px" }} value={this.state.currentEditorState} onChange={this.handleChange}/>
                <div>
                    <p>
                    <button onClick={this.handleLoad}>Restore Data</button>
                    </p>
                    <p>
                    <button onClick={this.handleClear}>Clear Editor</button>
                    </p>
                </div>
            </div>
        )
    }
  }