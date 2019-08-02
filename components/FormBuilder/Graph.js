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

    nodes.forEach(fromNodeName => {
      const fromNode = this.nodes.get(fromNodeName);

      fromNode.render();

      fromNode.out.forEach((callback, toNodeName) => {
        const toNode = this.nodes.get(toNodeName)
        callback(fromNode, toNode);

        toNode.render();
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
    let result = false;
    // Mark all the vertices as not visited and 
    // not part of recursion stack 
    let visited = {};

    // Call the recursive helper function to 
    // detect cycle in different DFS trees
    for (let [key, value] of this.nodes) {
      let recStack = {};

      if (this.isCyclicUtil(key, visited, recStack)) {
        result = true;
        break;
      }
    }

    return result;
  }

  isCyclicUtil(key, visited, recStack) {
    // Mark the current node as visited and 
    // part of recursion stack 

    let result = false;

    if (!!recStack[key])
      return true;

    if (!!visited[key])
      return false;

    visited[key] = true;

    recStack[key] = true;

    // Outgoing Nodes
    const children = this.nodes.get(key) ? this.nodes.get(key).out : new Map();

    for (let [childKey, childValue] of children) {
      if (this.isCyclicUtil(childKey, visited, recStack)) {
        result = true;
        break;
      }
    }

    return result;
  }
}

export default Graph;
