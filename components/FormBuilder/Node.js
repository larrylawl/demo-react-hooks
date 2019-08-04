import { createRef } from "react";
import FormCheckbox from "components/FormCheckbox";

export default class Node {
  constructor(graph, name, component, opts) {
    this.graph = graph;
    this.name = name;
    this.component = component;
    this.props = opts.props || {};
    this.visible = typeof opts.visible !== "undefined" ? opts.visible : true;
    this.out = new Map();
    this.ui = null;
    this.ref = opts.ref ? createRef() : null;
  }

  to(nodeName, callback) {
    //const node = this.graph.getNode(nodeName);
    //this.out.set(node, callback);
    this.out.set(nodeName, callback);

    return this.graph;
  }

  render() {
    switch (this.component) {
      case "FormCheckbox":
        this.ui = (
          <FormCheckbox
            {...this.props}
            key={this.name}
            name={this.name}
            ref={this.ref}
            data-testid={this.name}
          />
        );
        break;
      default:
        console.warn("Invalid Component!");
    }
    this.props = this.ui.props;
  }

  setProps(callback) {
    this.props = callback(this.props);
  }

  setVisible(value) {
    this.visible = value;
  }

  call(name, ...args) {
    console.log("called");
    this.ref.current[name].apply(null, args);
  }
}
