import Graph from "./Graph";
import Edge from "./Edge"
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
        const { id, component, dependencies } = question;
        const opts = { props: question.props };
        graph.addNode(id, component, opts)

        for (let l = 0; l < dependencies.length; l++) {
          const dependency = dependencies[l];
          const to = Object.keys(dependency)[0];
          const edge = new Edge(id, to, dependency[to]);
          edges.push(edge);
        }
      }
    }
  }

  // Adding Edges only after nodes have been added. 
  // Having an incomplete nodes might lead to  `this.graph.getNode(nodeName);` in `node.to` to return undefined.
  for (let i = 0; i < edges.length; i++) {
    graph.addEdge(edges[i]);
  }

  if (graph.isCyclic()) {
    console.warn('Graph is cyclic!')
  }

  return graph;
}

export default getConfig;
