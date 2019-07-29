export default class Edge {
  constructor(fromNode, toNode, callback) {
    this.fromNode = fromNode;
    this.toNode = toNode;
    this.callback = callback;
  }

  getFromNode() {
    return this.fromNode;
  }

  getToNode() {
    return this.toNode;
  }

  getCallback() {
    return this.callback;
  }
}