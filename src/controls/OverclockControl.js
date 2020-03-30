import React from "react";
import Rete from "rete";


export class OverclockControl extends Rete.Control {
    static component = ({ value, onChange }) => (
        <span><input
            type="number"
            value={value}
            min="0"
            max="250"
            onChange={e => onChange(+e.target.value)}
            onPointerMove={e => e.stopPropagation()}
        />&nbsp;%</span>
    );

    constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = OverclockControl.component;

        const initial = node.data[key] || 100;

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            onChange: v => {
                this.setValue(v);
                this.emitter.trigger("process");
            }
        };
    }

    setValue(val) {
        val = val > 250 ? 250 : val;
        val = val < 0 ? 0 : val;
        this.props.value = val+'';
        this.putData(this.key, val);
        this.update();
    }

}