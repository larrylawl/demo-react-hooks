# Form Builder
Form Builder takes in an **input JSON**, constructs an adjacency list representing an **unweighted and directed graph** (every node is a component and every edge is a dependency), and outputs a **Form JSX**.

![Default Form](DefaultState.gif)

Input `JSON` has type `Config`
```
export interface Config {
  steps: Step[];
}

export interface Step {
  description?: string;
  id: string;
  title: string;
  className?: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title?: string;
  repeatable?: boolean;
  unit?: string;
  className?: string;
  questions: Question[];
}

export interface Question {
  id: string;
  type: string;
  answer?: any;
  className: string;
  component: string;
  dependencies: { [key: string]: CallBack }[];
  props: { [key: string]: any };
  isRefEnabled: boolean;
  content?: {
    [key: string]: string | object | Question[] | undefined;
    label: string;
    value?: any;
    placeholder?: string;
  };
  rules?: {
    [ruleType: string]: string | number | boolean | string[];
    required?: boolean;
    options?: string[];
  };
}

export type CallBack = (fromNode: Node, toNode: Node) => void;
```

## Setup
1. `npm install`
2. `npm run dev`
3. Disclaimer: This local setup differs from the ones in the gifs as I have integrated it with AXA's internal repo.

## Other Features
Circular Form <br />
![Circular Form](CircularState.gif)

Exaggerated Form <br />
![Exaggerated Form](ExaggeratedForm.gif)
