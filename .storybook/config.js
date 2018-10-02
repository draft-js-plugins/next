import { configure } from '@kadira/storybook';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../examples", true, /story\.jsx?$/));
}

configure(loadStories, module);
