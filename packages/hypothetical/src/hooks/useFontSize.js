import { generateHook } from './generate';

/**
 * In Solid, this is a custom hook that uses the `generateHook` utility
 * to create a hook for accessing the `fontSize` state from the context.
 *
 * In our hypothetical framework, we will simulate this by creating a
 * function that returns the `diffViewFontSize` property from the options.
 */
export const useFontSize = (options) => {
  // In a real framework, this would be more complex, likely involving
  // a context or store.
  return options?.diffViewFontSize || 14;
};
