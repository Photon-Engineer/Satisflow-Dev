// Rete and Plugins
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
//import DockPlugin from "rete-dock-plugin"
import AreaPlugin from "rete-area-plugin";
import ContextMenuPlugin from 'rete-context-menu-plugin';
import Rete from "rete";
// React
import React, { Component } from "react";
import ReactDOM from 'react-dom';
// Custom Components
import { initialize } from './ComponentStage';
import '../backgroundStyle.sass';
// Material UI
import {BlueButton} from './material-ui-components'


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
        /*
        this.editor.use(DockPlugin,{
            container: document.querySelector('.leftbar'),
            itemClass: 'dock-item',
            plugins: [ReactRenderPlugin]
        });
        */
       //this.editor.use(DockPlugin);

        container.classList.add('custom-node-editor');
        const background = document.createElement('div');
        background.classList = 'background';
        this.editor.use(AreaPlugin, { background });

        initialize(this.engine, this.editor); // Register and Create Initial Components

        this.editor.on('error',err=>alert(err));

        this.editor.on(
            "process nodecreated noderemoved connectioncreated connectionremoved",
            async (output) => {
                await this.engine.abort();
                await this.engine.process(this.editor.toJSON());
                if(output.output!=undefined){
                    setInterval(() => {
                        let node = output.output.node;
                        this.editor.view.updateConnections({ node });
                    }, 1000);
                }
            }
        );

        addDropStrategy(this.editor);

        this.editor.view.resize();
        this.editor.trigger("process");
        const {area} = this.editor.view;
        area.zoom(0.7,500,400)

        ReactDOM.render(<SaveLoadComponent mainEditor={this} />,document.querySelector('.right-menu'));
    }

    render() {
        return (
           <div ref={ref => this.createEditor(ref)} />
        );
    }
}


export default Editor;



function addDropStrategy(editor){
    editor.view.container.addEventListener('dragover', e => e.preventDefault())
    editor.view.container.addEventListener('drop', async e => {
        if(!e.dataTransfer) return;

        const name = e.dataTransfer.getData('componentName');
        const component = editor.components.get(name)

        if(!component) throw new Error(`Component ${name} not found`)

        // force update the mouse position
        editor.view.area.pointermove(e);
        const node = await createNode(component, editor.view.area.mouse);

        editor.addNode(node)
    })
}

async function createNode(component, position) {
    let node = await component.createNode({});

    node.position = [position.x, position.y];

    return node;
}



class SaveLoadComponent extends React.Component {

    constructor(props) {
        super(props);
        this.mainEditor = this.props.mainEditor;
        this.state = { currentEditorState: "Click the Export Data button to retrieve text that is representative of the current layout. You can reload that text later as a way of saving and loading your work." };
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
            //<button className = "slider" onClick={this.handleStore}>Export Data</button>
            <div className="right-menu">
                <BlueButton variant="contained" color="primary" onClick={this.handleStore}>Export Data</BlueButton>
                <textarea rows="4" columns="50" style={{ width: "150px", height: "600px" }} value={this.state.currentEditorState} onChange={this.handleChange}/>
                <BlueButton variant="contained" color="primary" onClick={this.handleLoad}>Restore Data</BlueButton>
                <BlueButton variant="contained" color="primary" onClick={this.handleClear}>Clear Editor</BlueButton>
            </div>
        )
    }
  }