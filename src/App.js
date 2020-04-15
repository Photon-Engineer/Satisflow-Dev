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
      <div className="bottombar">
        <p>&copy; Copyright 2020 by Joseph Cosentino&emsp;<a href="https://github.com/Photon-Engineer/Satisflow">Github Project and Documentation</a></p>
        </div>
    </div>
  );
}

export default App;


