// Rete and Plugins
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
//import DockPlugin from "rete-dock-plugin"
import CommentPlugin from "rete-comment-plugin";
import AreaPlugin from "rete-area-plugin";
import ContextMenuPlugin from 'rete-context-menu-plugin';
import ModulePlugin from 'rete-module-plugin';
//import ConnectionReroutePlugin from 'rete-connection-reroute-plugin';
//import ConnectionPathPlugin from 'rete-connection-path-plugin';
import Rete, { Connection } from "rete";
// React
import React, { Component } from "react";
import ReactDOM from 'react-dom';
// Custom Components
import { initialize } from './ComponentStage';
import '../backgroundStyle.sass';
// Material UI
import { BlueButton } from './material-ui-components'
import MenuItem from '@material-ui/core/MenuItem';
import {ItemSelect} from '../engine/material-ui-components'

class Editor extends Component {
    constructor(props) {
        super(props);
        this.editor = null;
        this.engine = null;
    }


    createEditor = async (container) => {
        const key = "satisflow@0.5.0"; //also in component stage
        this.engine = new Rete.Engine(key);
        this.editor = new Rete.NodeEditor(key, container);
        window.rete_editor = this.editor;
        this.editor.use(ConnectionPlugin);
        this.editor.use(ReactRenderPlugin);
        
        /*
        this.editor.use(ConnectionPathPlugin, {
            type: ConnectionPathPlugin.DEFAULT, // DEFAULT or LINEAR transformer
            //transformer: () => ([x1, y1, x2, y2]) => [[x1, y1], [x2, y2]], // optional, custom transformer
            curve: ConnectionPathPlugin.curveBundle, // curve identifier
            options: { vertical: false, curvature: 0.1 }, // optional
            //arrow: { color: 'steelblue', marker: 'M-5,-10 L-5,10 L20,0 z' }
        });
        */
        

        //this.editor.use(ConnectionReroutePlugin); // this is not working.. not sure what is preventing it. 

        // Modules
        var defaultData = () => ({id: key, nodes: {}});
        var modules = {"Main View": {data: defaultData()}};
        this.editor.modules = modules;
        this.editor.use(ModulePlugin,{engine:this.engine, modules:this.editor.modules})
        //this.engine.use(ModulePlugin, {engine:this.engine, modules:this.editor.modules});
            // Needs -> Module component, input node, output node, HTML area for creating/loading/adding modules
            // Thoughts -> Module component cannot be rotated. Input/output nodes will have a dropdown to select socket type.
            //             When a module is created, the user is asked to provide a name for it. 
            //             Consider changing the dock into an accordian, which can be used to group entries, material-ui already has one -> https://material-ui.com/components/accordion/
        
        this.editor.currentModule = "Main View";
        // Context Menu
        this.editor.use(ContextMenuPlugin, {
            searchBar: false, // true by default
            searchKeep: title => true, // leave item when searching, optional. For example, title => ['Refresh'].includes(title)
            delay: 100,
        });

        container.classList.add('custom-node-editor');
        const background = document.createElement('div');
        background.classList = 'background';
        //
        this.editor.use(AreaPlugin, { background: background, snap: {size: 8, dynamic: true} });

        this.editor.use(CommentPlugin,{
            //frameCommentKeys: { code: 'KeyC', shiftKey: false, ctrlKey: false, altKey: true },
            //inlineCommentKeys: { code: 'KeyC', shiftKey: true, ctrlKey: false, altKey: false },
            //deleteCommentKeys: { code: 'Delete', shiftKey: false, ctrlKey: false, altKey: false }
            //margin: 30,
        })


        initialize(this.engine, this.editor); // Register and Create Initial Components

        this.editor.on('error', err => alert(err));

        this.editor.on(
            "process nodecreated noderemoved connectioncreated connectionremoved",
            async (output) => {
                await this.engine.abort();
                await this.engine.process(this.editor.toJSON());
                if (output.output !== undefined) {
                    let node = output.output.node;
                    setTimeout(() => {
                        this.editor.view.updateConnections({ node });
                    }, 1000);

                }
            }
        );

        this.editor.on("multiselectnode", (args) => args.accumulate = args.e.ctrlKey || args.e.metaKey);

        this.editor.on('connectionpath',(data)=>{
            const {
                points, // array of numbers, e.g. [x1, y1, x2, y2]
                connection, // Rete.Connection instance
                d // string, d attribute of <path>
            } = data;
            if(connection!==undefined){
                const outKey = connection.output.key;
                const inKey = connection.input.key;
                const inNode = connection.input.node;
                const outNode = connection.output.node;
                const outType = outNode.outputs.get(outKey).socket.name;
                const [x1, y1, x2, y2] = points;
                if(outType==="number"){
                    const hx1 = x1 + Math.abs(x2 - x1) * 0.3;
                    const hx2 = x2 - Math.abs(x2 - x1) * 0.3;
                    data.d = `M ${x1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${x2} ${y2} `;
                    //data.d = `M ${x1} ${y1} C ${x2} ${y1} ${x1} ${y2} ${x2} ${y2}`;
                } else {
                    var svgstr = `M ${x1} ${y1} C `;
                    if(socketIsHorizontal(outNode,outKey)){
                        svgstr = svgstr + `${x2} ${y1} `;
                    }else{
                        svgstr = svgstr + `${x1} ${y2} `;
                    }
                    if(socketIsHorizontal(inNode,inKey)){
                        svgstr = svgstr + ` ${x1} ${y2} ${x2} ${y2}`;
                    } else {
                        svgstr = svgstr + ` ${x2} ${y1} ${x2} ${y2}`;
                    }
                    data.d = svgstr;
                    //data.d = `M ${x1} ${y1} C ${x2} ${y1} ${x1} ${y2} ${x2} ${y2}`;
                }
            }

        })
        addDropStrategy(this.editor);

        this.editor.view.resize();
        this.editor.trigger("process");
        const { area } = this.editor.view;
        area.zoom(0.7, 500, 400)

        ReactDOM.render(<SaveLoadComponent mainEditor={this} />, document.querySelector('.right-menu'));
    }

    render() {
        return (
            <div ref={ref => this.createEditor(ref)} />
        );
    }
}


export default Editor;



function addDropStrategy(editor) {
    editor.view.container.addEventListener('dragover', e => e.preventDefault())
    editor.view.container.addEventListener('drop', async e => {
        if (!e.dataTransfer) return;

        const name = e.dataTransfer.getData('componentName');
        const component = editor.components.get(name)

        if (!component) return;

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
        //this.handleRefresh = this.handleRefresh.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleFileLoad = this.handleFileLoad.bind(this);
        this.handleZoom = this.handleZoom.bind(this);
        this.abort = this.abort.bind(this);
    }

    handleStore() {
        var lz = require('lz-string');
        //const text = JSON.stringify(this.mainEditor.editor.toJSON());
        //const text = toHexString(lz.compressToUint8Array(JSON.stringify(this.mainEditor.editor.toJSON())));
        const text = lz.compressToEncodedURIComponent(JSON.stringify(this.mainEditor.editor.toJSON()));

        this.setState({ currentEditorState: text });
    }

    handleLoad() {
        var json = "";
        var lz = require('lz-string');
        var text = lz.decompressFromEncodedURIComponent(this.state.currentEditorState);
        try {
            json = JSON.parse(text);
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

    async abort() {
        await this.mainEditor.engine.abort();
    }
    /*
    handleRefresh() {
        //this.mainEditor.editor.fromJSON(this.mainEditor.editor.toJSON());
        var thisJson = this.mainEditor.editor.toJSON();
        var storedJson = JSON.stringify(thisJson);
        thisJson.nodes = {}
        this.mainEditor.editor.fromJSON(thisJson);
        alert('Refreshing editor.')
        this.mainEditor.editor.fromJSON(JSON.parse(storedJson));
    }
    */

    handleClear() {
        this.abort();
        var thisJson = this.mainEditor.editor.toJSON();
        thisJson.nodes = {}
        this.mainEditor.editor.fromJSON(thisJson);
        this.mainEditor.editor.trigger('removecomment',{type:"frame"});
        this.mainEditor.editor.trigger('removecomment',{type:"inline"});
    }

    handleSave(){
        this.mainEditor.editor.modules[this.mainEditor.editor.currentModule].data = this.mainEditor.editor.toJSON();
        const text = JSON.stringify(this.mainEditor.editor.modules);
        const filename = 'Satisflow_Data.JSON';

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    handleFileLoad(event) {
        var file = event.target.files;
        console.log(file);
        const reader = new FileReader();
        reader.onloadend = (e) => {
            var json = JSON.parse(e.target.result);
            modify(this.mainEditor.editor.modules,json);
            //this.mainEditor.editor.modules = json;
            var event = {target: {value: "Main View"}};
            //this.mainEditor.editor.use(ModulePlugin,{engine:this.engine, modules:this.mainEditor.editor.modules})
            this.mainEditor.editor.ModuleHandlerChangeEvent(event,false);
            //this.mainEditor.editor.currentModule = "Main View";
            //this.mainEditor.editor.fromJSON(json["Main View"].data);
        }
        if(file.length>0){
            reader.readAsText(file[0]);
        }
        
    }

    handleZoom(event) {
        AreaPlugin.zoomAt(this.mainEditor.editor);
    }

    render() {

        return (
            //<button className = "slider" onClick={this.handleStore}>Export Data</button>

            //<textarea rows="4" columns="50" style={{ width: "200px", height: "600px" }} value={this.state.currentEditorState} onChange={this.handleChange} />
            //<BlueButton variant="contained" color="primary" onClick={this.handleLoad}>Restore Data</BlueButton>
            //<input type="file" onChange={this.handleFileLoad} id="test" key="test" />
            <div>
                <BlueButton variant="contained" color="primary" onClick={this.handleSave}>Export Data</BlueButton>
                <input type="file" hidden id="blue-file-button" onChange={this.handleFileLoad}/>
                <label htmlFor="blue-file-button">
                    <BlueButton variant="contained" component="span" color="primary">Load Data</BlueButton>
                </label> 
                <BlueButton variant="contained" color="primary" onClick={this.handleClear}>Clear Editor</BlueButton>
                <BlueButton variant="contained" color="primary" onClick={this.handleZoom}>Reset Zoom</BlueButton>
                <ModuleHandler editor={this.mainEditor.editor} engine={this.mainEditor.engine}/>
            </div>
        )
    }
}

function modify(obj, newObj) {

    Object.keys(obj).forEach(function(key) {
      delete obj[key];
    });
  
    Object.keys(newObj).forEach(function(key) {
      obj[key] = newObj[key];
    });
    
  }


  function socketIsHorizontal(node,key) {
    let rot = node.data["rotationState"];
    let type = node["name"];
    
    const rot02 = rot === 0 || rot ===2 || rot === undefined; // check if rotation state is 0 or 2 (horizontal states)
    const sCheck = type==="Splitter" && !(key==="i1" || key==="o2"); // Check for vertical socket on splitter node
    const mCheck = type==="Merger" && !(key==="o1" || key==="i2"); // Check for vertical socket on merger node
    const smCheck = sCheck || mCheck; //check for non-splitter/ merger bldg
    const noSM = type!=="Splitter" && type !=="Merger";

    var isHorSocket = true;

    if(rot02 && smCheck) {
        isHorSocket = false;
    }
    if(!rot02 && !smCheck) {
        isHorSocket = false;
    }
    if(!rot02 && noSM){
        isHorSocket = false;
    }
    
    return isHorSocket;

  }

  class ModuleHandler extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            value: "Main View",
        };
        this.props.editor.ModuleHandlerChangeEvent = this.handleChange.bind(this);
    }
    emptyData = {id: "satisflow@0.5.0", nodes: {}};

    handleChange = (event,doSave = true) => {
        if(doSave){
            var modData = this.props.editor.modules;
            modData[this.state.value].data = this.props.editor.toJSON();
        }
        let selectedValue = event.target.value;
        //let idx = this.state.modulenames.findIndex(i => i === selectedValue);
        //this.props.onSelectChange(this.props.listItems[idx]);
        this.props.editor.currentModule = selectedValue;
        this.setState({ value: selectedValue});
    }

    createNewModule = (event) => {
        var modName = window.prompt("Enter a unique name for the module:","My Module "+Object.keys(this.props.editor.modules).length);
        if(modName===null) return;
        if(Object.keys(this.props.editor.modules).indexOf(modName)==-1){
            this.props.editor.modules[this.state.value].data = this.props.editor.toJSON();
            //modData = modData.concat(this.emptyData);
            this.props.editor.modules[modName] = {data: this.emptyData};
            this.setState({value: modName});
        } else {
            window.alert('That name is already taken!')
        }
    }

    async componentDidUpdate() {
        var data = this.props.editor.modules[this.state.value].data;
        await this.props.editor.fromJSON(data);
        this.props.editor.currentModule = this.state.value;
        //if(Object.keys(data.nodes).length === 0 && data.nodes.constructor === Object) {
        //    return;
        //}
        AreaPlugin.zoomAt(this.props.editor);
    }

    renameModule = (event) => {
        if(this.state.value==="Main View") {
            alert("Main View is not a module and cannot be renamed.");
            return;
        }
        var modName = window.prompt("Enter a new unique name for this module:",this.state.value);
        //var idx = this.state.modulenames.findIndex(i => i === this.state.value);
        // TODO add uniqueness check like above
        //var m = this.state.modulenames;
        //m[idx] = modName;
        this.props.editor.modules[modName] = {data: this.props.editor.toJSON()};
        delete this.props.editor.modules[this.state.value];
        this.setState({value: modName})
    }

    deleteModule = (event) => {
        if(this.state.value==="Main View") {
            alert("Main View is not a module and cannot be deleted.");
            return;
        }
        if(Object.keys(this.props.editor.modules).length > 1){
            delete this.props.editor.modules[this.state.value];
            this.setState({value: Object.keys(this.props.editor.modules)[0]})
        }else{
            alert('Cannot delete only module.');
        }
    }

    render() {
        return (
            <div>
                <br />
                <hr style={{borderColor: "#e3f2fd"}}/>
                <h3 className="dock-message">Modules</h3>
                <br />
                <ItemSelect className="item-select" value={this.state.value} autoWidth={true} onChange={this.handleChange}>
                    {Object.keys(this.props.editor.modules).map(mod => <MenuItem key={mod} value={mod}>{mod}</MenuItem>)}
                </ItemSelect>
                <br />
                <BlueButton variant="contained" color="primary" onClick={this.createNewModule}>Create New</BlueButton>
                <BlueButton variant="contained" color="primary" onClick={this.renameModule}>Rename</BlueButton>
                <BlueButton variant="contained" color="primary" onClick={this.deleteModule}>Delete</BlueButton>
            </div>
        )
    }
}