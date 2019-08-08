# Form Builder

## The Opportunity

AXA's insurance ecommerce products are a sequence of form components, and each component is manually configured. <br />
Can we automate this process, and cut down development time for ecommerce products?

## The Solution

Form Builder takes in an **input JSON**, constructs an adjacency list representing an **unweighted and directed graph** (every node is a component and every edge is a callback), and outputs a **Form JSX**. <br />

## Setup

1. `npm install`
2. `npm run dev`

## Integration with AXA internal component library

![Default Form](DefaultState.gif)

![Circular Form](CircularState.gif)

![Exaggerated Form](ExaggeratedForm.gif)

## Credits

[Shawn Lim](https://github.com/geekyme/demo-react-hooks), for his graph POC <br />
[Zhi Yue](https://github.com/ZhiyueYi), for pair programming with me
