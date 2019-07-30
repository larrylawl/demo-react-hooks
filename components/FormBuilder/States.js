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

// Console log `call` in Node.js
export const circularState = {
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
                label: 'Checking this will check #2',
              },
              dependencies: [
                {
                  "checkTwo": (fromNode, toNode) => {
                    if (fromNode) {
                      toNode.call("setValue", true);
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
                label: 'Checking this will check #3',
              },
              dependencies: [
                {
                  "checkThree": (fromNode, toNode) => {
                    if (fromNode) {
                      toNode.call("setValue", true);
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
                label: 'Checking this will check #1',
              },
              dependencies: [
                {
                  "checkOne": (fromNode, toNode) => {
                    if (fromNode) {
                      toNode.call("setValue", true);
                    }
                  }
                },
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
