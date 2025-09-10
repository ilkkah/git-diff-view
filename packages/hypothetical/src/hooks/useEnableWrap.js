import { generateHook } from './generate';

/**
 * In Solid, this is a custom hook that uses the `generateHook` utility
 * to create a hook for accessing the `enableWrap` state from the context.
 *
 * In our hypothetical framework, we will simulate this by creating a
 * function that returns the `enableWrap` property from the options.
 */
export const useEnableWrap = (options) => {
  // In a real framework, this would be more complex, likely involving
  // a context or store.
  return options?.diffViewWrap || false;
};
