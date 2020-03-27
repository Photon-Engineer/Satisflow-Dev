import React from "react";
import Rete from "rete";


export class NumControl extends Rete.Control {
    static component = ({ value, onChange }) => (
        <input
            type="number"
            value={value}
            onChange={e => onChange(+e.target.value)}
            onPointerMove={e => e.stopPropagation()}
        />
    );

    constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = NumControl.component;

        const initial = node.data[key] || 0;

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

export class StrControl extends Rete.Control {
    static component = ({ value, onChange }) => (
        <input
            type="text"
            value={value}
            onChange={e => onChange(+e.target.value)}
            onPointerMove={e => e.stopPropagation()}
        />
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

export class BeltControl extends Rete.Control {
    static component = ({ value, onChange }) => (
        <span>
            Item: <input
                type="text"
                size = "8"
                value={value.item}
                onChange={e => onChange(value,+e.target.value,"item")}
                onPointerMove={e => e.stopPropagation()}
            />
            &nbsp;PPM: <input
                type="number"
                size = "4px"
                value={value.ppm}
                onChange={e => onChange(value,+e.target.value,"ppm")}
                onPointerMove={e => e.stopPropagation()}
            />
        </span>
    );

    constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = BeltControl.component;

        const initial = node.data[key] || {item: "Iron Ore", ppm: 30};

        node.data[key] = initial;
        this.props = {
            readonly,
            value: initial,
            onChange: (v,n,u) => {
                v[u] = n;
                this.setValue(v);
                this.emitter.trigger("process");
            }
        };
    }

    setValue(val) {
        //alert(JSON.stringify(val))
        this.props.value = val;
        this.putData(this.key, val);
        this.update(); 
    }
}

