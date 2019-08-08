import Graph from './Graph';

/**
 * Constructs an adjacency list representing an unweighted and directed graph based on input config JSON.
 * Throws a warning if graph is cyclic.
 * @param {string} initialState - JSON
 * @return {string} Graph
 */

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
        const fromNodeName = id;
        const opts = { props: question.props, ref: question.ref };
        graph.addNode(fromNodeName, component, opts);

        dependencies.forEach(dependency => {
          const [toNodeName, callBack] = Object.entries(dependency)[0];
          const edge = { fromNodeName, toNodeName, callBack };
          edges.push(edge);
        });
      });
    });
  });

  // Adding Edges only after nodes have been added.
  // Having an incomplete nodes might lead to  `this.graph.getNode(nodeName);` in `node.to` to return undefined.
  edges.map(edge => graph.addEdge(edge));

  if (graph.isCyclic()) {
    console.warn('Graph is cyclic!');
  }

  return graph;
}

export default getConfig;
