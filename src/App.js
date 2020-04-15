import React from 'react';
import './App.css';
import NodeEditor from './engine/ReteEngine';

function App() {
  let nodeEditor = <NodeEditor />;
  return (
    <div className="wrapper">
      <div className="topbar">
        <div className="logo">SATISFLOW</div>
        <div className="tip">Tip: Right click a node to delete, or clone it to make a copy. Right click the in the editor to quick-select a node.</div>
      </div>
      <div className="rows">
        <div className="column sidebar leftbar"></div>
        <div className="column canvas">{nodeEditor}</div>
        <div className="column sidebar right-menu"></div>
      </div>
      <div className="bottombar">Note: Only tested on Chrome browser version 80.0... as of 3/30/2020.</div>
    </div>
  );
}

export default App;


