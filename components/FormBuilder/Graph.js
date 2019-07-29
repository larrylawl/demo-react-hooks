import { createRef } from "react";
import FormCheckbox from "components/FormCheckbox";

class Node {
  constructor(graph, name, component, opts) {
    this.graph = graph;
    this.name = name;
    // this.renderFunc = opts.renderFunc;
    this.component = component
    this.props = opts.props || {};
    this.visible = typeof opts.visible !== "undefined" ? opts.visible : true;
    this.out = new Map();
    this.ui = null;
    this.ref = createRef();
  }

  to(nodeName, callback) {
    const node = this.graph.getNode(nodeName);

    this.out.set(node, callback);

    return this.graph;
  }

  render() {
    // this.ui = this.renderFunc(
    //   { key: this.name, name: this.name, ...this.props },
    //   this.ref
    // );
    switch (this.component) {
      case 'FormCheckbox':
        this.ui = <FormCheckbox {...this.props} key={this.name} name={this.name}></FormCheckbox>;
        break;
      default:
        console.warn('Invalid Component!')
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
    this.ref.current[name].apply(null, args);
  }
}

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNodes(initialState) {
    const steps = initialState.steps;
    for (let i = 0; i < steps.length; i++) {
      // TODO: add step
      const step = steps[i];
      const sections = step.sections;
      for (let j = 0; j < sections.length; j++) {
        // TODO: add section
        const section = sections[j];
        const questions = section.questions;
        for (let k = 0; k < questions.length; k++) {
          const question = questions[k];
          const { id, component } = question;
          const opts = { props: question.props };
          this.addNode(id, component, opts)
        }
      }
    }

    return this;
  }

  addNode(name, component, opts) {
    const node = new Node(this, name, component, opts);
    this.nodes.set(name, node);

    return this;
  }

  getNode(name) {
    return this.nodes.get(name);
  }

  link(name) {
    return this.getNode(name);
  }

  runChanges(changes) {
    const nodes = Object.keys(changes);

    nodes.forEach(name => {
      const node = this.nodes.get(name);

      node.render();

      node.out.forEach((callback, outNode) => {
        const change = changes[name];

        callback(change, outNode);

        outNode.render();
      });
    });
  }

  init() {
    const changes = {};
    this.nodes.forEach((node, name) => {
      if (node.visible) {
        node.render();

        if (typeof node.props.initialState !== "undefined") {
          changes[name] = node.props.initialState;
        }
      }
    });

    return changes;
  }

  ui() {
    const children = [];

    for (const [_, node] of this.nodes) {
      if (node.visible) {
        children.push(node.ui);
      }
    }

    return children;
  }
}

export default Graph;
