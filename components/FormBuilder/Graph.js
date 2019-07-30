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

  // DFS to apply callback of all linked nodes
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

  isCyclic() {
    const nodes = Array.from(this.nodes);
    const length = nodes.length;

    // Mark all the vertices as not visited and 
    // not part of recursion stack 
    let visited = new Array(length).fill(false);
    let recStack = new Array(length).fill(false);

    // Call the recursive helper function to 
    // detect cycle in different DFS trees 
    for (let i = 0; i < length; i++) {
      if (this.isCyclicUtil(i, visited, recStack, nodes))
        return true;
    };
    return false
  }

  isCyclicUtil(i, visited, recStack, nodes) {
    // Mark the current node as visited and 
    // part of recursion stack 
    if (recStack[i])
      return true;

    if (visited[i])
      return false;

    visited[i] = true;

    recStack[i] = true;

    // Outgoing Nodes
    const children = Array.from(nodes[i][1].out);

    for (let j = 0; j < children.length; j++) {
      if (this.isCyclicUtil(j, visited, recStack, nodes))
        return true;
    }

    // reset recursion stack for next unvisited node
    recStack[i] = false;

    return false;
  }
}

export default Graph;
