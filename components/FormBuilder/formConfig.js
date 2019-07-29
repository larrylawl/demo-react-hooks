import Graph from "./Graph";
import Edge from "./Edge"
import FormDateRange from "components/FormDateRange";
import FormSelect from "components/FormSelect";
import FormInput from "components/FormInput";
import FormRadio from "components/FormRadio";
import FormCheckbox from "components/FormCheckbox";

export const defaultState = {
  steps: [
    {
      id: 'mainInformation',
      title: 'Main Information',
      description:
        '<p style="background-color:#fafafa; color:#999; margin:0 20px 40px; padding:20px">Under Section 25(5) of the Insurance Act (Cap 142) or any subsequent amendment thereof, you are to disclose in this application/proposal form fully and faithfully all facts which you know or ought to know, otherwise, the policy issued hereunder may be void.</p>',
      className: 'mainInformation',
      sections: [
        {
          id: 'personalDetails',
          title: 'Personal Details',
          className: 'personalDetails',
          questions: [
            {
              id: 'checkOne',
              className: 'checkOne',
              type: 'text',
              component: 'FormCheckbox',
              props: {
                label: 'Checking this will uncheck #3',
              },
              dependencies: [
                {
                  "checkThree": (fromNode, toNode) => {
                    if (fromNode) {
                      toNode.call("setValue", false);
                    }
                  }
                }
              ],
              rules: {
                pattern: '^[A-Za-z ]+$',
                required: true
              }
            },
            {
              id: 'checkTwo',
              className: 'checkTwo',
              type: 'text',
              component: 'FormCheckbox',
              props: {
                label: 'Checking this will uncheck #3',
              },
              dependencies: [
                {
                  "checkThree": (fromNode, toNode) => {
                    if (fromNode) {
                      toNode.call("setValue", false);
                    }
                  }
                },
              ],
              rules: {
                pattern: '^[A-Za-z ]+$',
                required: true
              }
            },
            {
              id: 'checkThree',
              className: 'checkThree',
              type: 'text',
              component: 'FormCheckbox',
              props: {
                label: 'Checking this will uncheck #1 and #2',
              },
              dependencies: [
                {
                  "checkOne": (fromNode, toNode) => {
                    if (fromNode) {
                      toNode.call("setValue", false);
                    }
                  }
                },
                {
                  "checkTwo": (fromNode, toNode) => {
                    if (fromNode) {
                      toNode.call("setValue", false);
                    }
                  }
                }
              ],
              rules: {
                pattern: '^[A-Za-z ]+$',
                required: true
              }
            }
          ]
        }
      ]
    }
  ]
};

function getConfig(initialState = defaultState) {
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
          console.log('edge:', edge);
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

  return graph;
}

export default getConfig;
