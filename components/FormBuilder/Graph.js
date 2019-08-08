import Node from './Node';

/** Class representing a graph as an adjacency list. */
class Graph {
  /**
   * Creates an empty graph.
   */
  constructor() {
    this.nodes = new Map();
  }

  /**
   * Adds an edge.
   * @param {Object} edge
   * @param {string} edge.fromNodeName
   * @param {string} edge.toNodeName
   * @param {function} edge.callback
   * @return {Graph} Graph instance
   */
  addEdge(edge) {
    const { fromNodeName, toNodeName, callBack } = edge;
    const fromNode = this.getNode(fromNodeName);
    const toNode = this.getNode(toNodeName);
    return fromNode.linkTo(toNode, callBack);
  }

  /**
   * Adds a node.
   * @param {string} id - Node id
   * @param {string} component - Name of SG-React-Component
   * @param {Object} opts - Object that will be used to set node instance attributes
   * @return {Graph} Graph instance
   */
  addNode(id, component, opts) {
    const node = new Node(this, id, component, opts);
    this.nodes.set(id, node);

    return this;
  }

  /**
   * Get Node from node id.
   * @param {string} id - Node id
   * @return {Graph} Node instance
   */
  getNode(id) {
    return this.nodes.get(id);
  }

  // TODO: Is there a need to render itself?
  // TODO: rename dep to edge
  /**
   * For every node n in `changes`, runChanges will
   * 1) render n,
   * 2) trigger the callback associated with all of n's outgoing nodes,
   * 3) render all of n's outgoing nodes.
   * @param {Object} changes - An index of changes keyed by node id.
   */
  runChanges(changes) {
    const nodes = Object.keys(changes);

    nodes.forEach(fromNodeName => {
      const fromNode = this.nodes.get(fromNodeName);
      fromNode.render();
      fromNode.out.forEach((callback, toNode) => {
        callback(fromNode, toNode);
        toNode.render();
      });
    });
  }

  // TODO: Analyse if init() is unnecessary; console.logging changes returns an empty object
  /**
   * Renders every node and returns an index of changes keyed by node id.
   * @return {Object}
   */
  init() {
    const changes = {};
    this.nodes.forEach((node, id) => {
      if (node.visible) {
        node.render();

        if (typeof node.props.initialState !== 'undefined') {
          changes[id] = node.props.initialState;
        }
      }
    });

    // console.log('changes:', changes);
    return changes;
  }

  /**
   * Returns an array containing SG-React-Components.
   * Note that since every node represents a component, the order of nodes in config will determine the order of the component being rendered
   * @return {JSX[]}
   */
  ui() {
    const children = [];

    for (const [_, node] of this.nodes) {
      if (node.visible) {
        children.push(node.ui);
      }
    }

    return children;
  }

  /**
   * Detects if graph instance is cyclic using modified DFS.
   * https://www.geeksforgeeks.org/detect-cycle-in-a-graph/
   * @return {boolean} result
   */
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

  /**
   * Checks if the given node has a cycle.
   * @param {string} key - Node ID
   * @param {Object} visited - Tracks visited nodes
   * @param {Object} recStack - Tracks recursion stack of nodes visited.
   */
  isCyclicUtil(key, visited, recStack) {
    // Mark the current node as visited and
    // part of recursion stack

    let result = false;

    if (!!recStack[key]) return true;

    if (!!visited[key]) return false;

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
