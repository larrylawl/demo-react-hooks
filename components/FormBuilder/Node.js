import { createRef } from "react";
import FormCheckbox from "components/FormCheckbox";
import FormInput from "components/FormInput";

/** Class representing a node. */
export default class Node {
  /**
   * Creates a node.
   *
   * @param {Graph} graph - Graph associated with node; graph and nodes have a one-to-many relationship
   * @param {string} id
   * @param {JSX} component - SG-React-Component associated with node
   * @param {Object} opts - Options for node's attributes
   * @param {Object} opts.props - Props to be passed into node's component
   * @param {boolean} opts.visible
   * @param {boolean} opts.ref - Boolean to enable ref
   */
  constructor(graph, id, component, opts) {
    this.graph = graph;
    this.id = id;
    this.component = component;
    this.props = opts.props || {};
    this.visible = typeof opts.visible !== "undefined" ? opts.visible : true;
    this.ref = opts.ref ? createRef() : null;
    this.out = new Map();
    this.ui = null;
  }

  /**
   * Creates an edge from this node to another node in the graph.
   *
   * @param {Node} toNode -
   * @return {Graph} Returns graph associated with node; this allows for method chaining.
   * (eg: this.graph.addEdge(edge).addEdge(edge)...)
   */
  linkTo(toNode, callback) {
    this.out.set(toNode, callback);
    return this.graph;
  }

  render() {
    switch (this.component) {
      case "FormCheckbox":
        this.ui = (
          <FormCheckbox
            {...this.props}
            key={this.id}
            name={this.id}
            ref={this.ref}
            data-testid={this.id}
          />
        );
        break;
      case "FormInput":
        this.ui = (
          <FormInput
            {...this.props}
            key={this.id}
            name={this.id}
            ref={this.ref}
            data-testid={this.id}
          />
        );
        break;
      default:
        console.warn("Invalid Component!");
    }
    this.props = this.ui.props;
  }

  /**
   * Call methods exposed by underlying component with given arguments.
   * This works because ref created in the constructor receives underlying DOM element (ie SG-React-Component) as its current property.
   * https://reactjs.org/docs/refs-and-the-dom.html
   */
  call(method, ...args) {
    console.log("called");
    return this.ref.current[method].apply(null, args);
  }
}
