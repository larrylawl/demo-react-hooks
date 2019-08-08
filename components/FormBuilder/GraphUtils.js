import { useEffect, useState, useRef } from 'react';

// TODO: Analyse if we can integrate useGraph into Formbuilder/index.js directly.

/**
 * Returns
 * 1) ui, which will be rendered in FormBuilder/index.js and
 * 2) runChanges, which will update ui after changes are made.
 * Also initialises the graph ui.
 *
 * @param {Graph} graph
 * @return {ui: JSX[], runChanges: function}
 */
export function useGraph(graph) {
  const initData = useRef({});
  const [ui, setState] = useState(() => {
    initData.current = graph.init();

    return graph.ui();
  });

  useEffect(() => {
    graph.runChanges(initData.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runChanges(changes) {
    graph.runChanges(changes);
    setState(graph.ui());
  }

  return {
    ui,
    runChanges
  };
}
