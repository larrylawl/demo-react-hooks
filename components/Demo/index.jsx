import FormBuilder from "components/FormBuilder";
import formConfig from "components/FormBuilder/formConfig";
import Layout from "components/Layout";
import { H2 } from "components/Typography";
import { FaGithub, FaGitlab } from "react-icons/fa";
import styles from "./Demo.scss";
import { defaultState, circularState, exaggeratedState } from "../FormBuilder/States";

export function getInitialState(key) {
  // Silly code for retrieving saved state. Do not copy!
  try {
    if (typeof window === "undefined") return;
    const state = localStorage.getItem(key);

    if (state !== null) {
      return JSON.parse(state);
    } else {
      throw new Error(`Cannot find ${key}`);
    }
  } catch (e) {
    console.warn(e.message);
  }
}

export default function Demo() {
  function customValidate(value) {
    if (value !== "boo") {
      return "Value is not boo";
    } else {
      return null;
    }
  }
  return (
    <Layout>
      <a
        href="https://github.com/geekyme/demo-react-hooks"
        target="_blank"
        className={styles.github}
      >
        <FaGithub className={styles.icon} />
      </a>
      <a
        href="https://gitlab.com/geekyme/demo-react-hooks"
        target="_blank"
        className={styles.gitlab}
      >
        <FaGitlab className={styles.icon} />
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
