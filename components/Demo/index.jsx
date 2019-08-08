import FormBuilder from "components/FormBuilder";
import formConfig from "components/FormBuilder/formConfig";
import Layout from "components/Layout";
import { H2 } from "components/Typography";
import { FaGithub, FaGitlab } from "react-icons/fa";
import styles from "./Demo.scss";
import {
  defaultState,
  circularState,
  exaggeratedState
} from "../FormBuilder/States";

export default function Demo() {
  return (
    <Layout>
      <a
        href="https://github.com/larrylawl/demo-react-hooks"
        target="_blank"
        className={styles.github}
      >
        <FaGithub className={styles.icon} />
      </a>
      <div className={styles.container}>
        <div className={styles.formBuilder}>
          <div>
            <H2>Form Builder</H2>
            <FormBuilder
              graph={formConfig(defaultState)}
              onSubmit={(state, errors) => {
                console.log("form", state);
                console.log("errors", errors);
              }}
            />
          </div>{" "}
          <br />
          <div>
            <H2>Form Builder with circular dependency</H2>
            Check console log to see infinite calls!
            <FormBuilder
              graph={formConfig(circularState)}
              onSubmit={(state, errors) => {
                console.log("form", state);
                console.log("errors", errors);
              }}
            />
          </div>
          <div>
            <H2>Form Builder with exaggerated state </H2>
            <FormBuilder
              graph={formConfig(exaggeratedState)}
              onSubmit={(state, errors) => {
                console.log("form", state);
                console.log("errors", errors);
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
