import React from "react";
import Rete from "rete";

export class StrControl extends Rete.Control {
    static component = ({ value, onChange }) => (
        <span> 
            Item:&nbsp;<input
            type="text"
            value={value}
            size = "12"
            onChange={e => onChange(e.target.value)}
            onPointerMove={e => e.stopPropagation()}
        />
        </span>
    );

    constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = StrControl.component;

        const initial = node.data[key] || 'No Data';

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
        this.props.value = val;
        this.putData(this.key, val);
        this.update();
    }
}