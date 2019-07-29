import Node from './Node'

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addEdge(edge) {
    return this.link(edge.getFromNode()).to(edge.getToNode(), edge.getCallback())
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
