import React from 'react';
//import './App2.scss';
import './App.scss';
import './Dock.scss';
import './Nodes.scss';
import NodeEditor from './engine/ReteEngine';
import { version } from './version'


function App() {
  let nodeEditor = <NodeEditor />;

  window.addEventListener('beforeunload', onBeforeUnload);

  return (
    <div className="wrapper">
      <div className="topbar">
        <div className="logo">SATISFLOW</div>
        <TipCycle />
      </div>
      <div className="sidebar leftbar"></div>
      <div className="canvas">{nodeEditor}</div>
      <div className="sidebar right-menu"></div>
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
          <button className="donateButton" title="PayPal - The safer, easier way to pay online!">Support Satisflow Development</button>
      </form>
    )
  }
}

class TipCycle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tipValue: Math.floor(Math.random() * (this.tips.length))
    }
    this.cycleTip = this.cycleTip.bind(this);
  }
  tips = [
    "Tip: Right click a node to delete, or clone it to make a copy. Right click the in the editor to quick-create a node.",
    "Tip: Ctrl-Click Multiple nodes and drag to move many nodes at once.",
    "Tip: Click a node, then press 'R' to rotate the input and output directions.",
    "Tip: The balancer node takes multiple inputs/ outputs, and will merge the inputs and split the outputs evenly.",
    "Tip: Use modules to organize various smaller factories. Put input/ output nodes in your modules to use them in combination with other modules.",
    "Tip: This tool shows the inputs/ outputs for each recipe, so it can be benefitial to work backwards from the main product you want to produce.",
    "Tip: Stay efficient!",
    "Tip: There are detailed instructions on how to use this tool in the documentation. Click the link at the bottom to see it.",
  ];

  cycleTip(event) {
    this.setState({
      tipValue: Math.floor(Math.random() * (this.tips.length)),
    })
  }

  render() {
    let tip = this.tips[this.state.tipValue];
    return(
      <div className="tip" onClick={this.cycleTip}>{tip}</div>
    )
  }
}

function onBeforeUnload(e) {
  if (true) {
      e.preventDefault();
      e.returnValue = '';
      return;
  }

  delete e['returnValue'];
}

export default App;
