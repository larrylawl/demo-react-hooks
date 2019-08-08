import Form from "components/Form";
import Button from "components/Button";
import { useGraph } from "components/FormBuilder/GraphUtils";

export default function FormBuilder(props) {
  const { graph, onSubmit, ...other } = props;
  const { ui, runChanges } = useGraph(graph);

  return (
    <Form
      onChange={(newState, changes) => {
        runChanges(changes);
      }}
      onSubmit={onSubmit}
      {...other}
    >
      {ui}
      <Button btnType="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
