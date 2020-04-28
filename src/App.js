import React from 'react';
import './App.css';
import NodeEditor from './engine/ReteEngine';
import { version } from './version'

function App() {
  let nodeEditor = <NodeEditor />;
  return (
    <div className="wrapper">
      <div className="topbar">
        <div className="logo">SATISFLOW</div>
        <div className="tip">Tip: Right click a node to delete, or clone it to make a copy. Right click the in the editor to quick-create a node.</div>
      </div>
      <div className="rows">
        <div className="sidebar leftbar"></div>
        <div className="canvas">{nodeEditor}</div>
        <div className="sidebar right-menu"></div>
      </div>
      <div className="bottombar">
        <p className="bottom-link">&copy; Copyright 2020 by Joseph Cosentino&emsp;<a style={{color:"lightyellow"}} href="https://github.com/Photon-Engineer/Satisflow">Github Project and Documentation</a>&nbsp;Version {version}&nbsp;<DonateButton /></p>
      </div>
    </div>
  );
}


class DonateButton extends React.Component {
  render() {
    return (
      <form style={{display:"inline"}} action="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=2DS93F4W6JQKQ&currency_code=USD&source=url" target="_blank">
          <input type="hidden" name="cmd" value="_donations" />
          <input type="hidden" name="business" value="2DS93F4W6JQKQ" />
          <input type="hidden" name="currency_code" value="USD" />
          <button className="donateButton" title="PayPal - The safer, easier way to pay online!">Donate with Paypal</button>
      </form>
    )
  }
}

export default App;


