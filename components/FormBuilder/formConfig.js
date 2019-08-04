import Graph from "./Graph";
import Edge from "./Edge";
import FormDateRange from "components/FormDateRange";
import FormSelect from "components/FormSelect";
import FormInput from "components/FormInput";
import FormRadio from "components/FormRadio";
import FormCheckbox from "components/FormCheckbox";

// Unweighted and directed graph
function getConfig(initialState) {
  const graph = new Graph();

  // Creating Adjacency List
  const steps = initialState.steps;
  const edges = [];

  steps.forEach(step => {
    // TODO: add step render
    const sections = step.sections;
    sections.forEach(section => {
      // TODO: add question render
      const questions = section.questions;
      questions.forEach(question => {
        const { id, component, dependencies } = question;
        const opts = { props: question.props, ref: question.ref };
        graph.addNode(id, component, opts);

        dependencies.forEach(dependency => {
          const to = Object.keys(dependency)[0];
          const edge = new Edge(id, to, dependency[to]);
          edges.push(edge);
        });
      });
    });
  });

  // Adding Edges only after nodes have been added.
  // Having an incomplete nodes might lead to  `this.graph.getNode(nodeName);` in `node.to` to return undefined.
  for (let i = 0; i < edges.length; i++) {
    graph.addEdge(edges[i]);
  }

  if (graph.isCyclic()) {
    console.warn("Graph is cyclic!");
  }

  return graph;
}

export default getConfig;
