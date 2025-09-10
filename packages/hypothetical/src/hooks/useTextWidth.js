import { getTextMeasureInstance } from "@git-diff-view/utils";
import { useIsMounted } from './useIsMounted';

/**
 * In Solid, this is a custom hook that measures the width of a text string.
 * It uses a `createEffect` to re-measure the text when it changes.
 *
 * In our hypothetical framework, we will simulate this by creating a
 * function that returns a calculated width.
 */
export const useTextWidth = ({ text, font }) => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    let baseSize = 6;
    const fontSize = parseInt(font?.fontSize || "14");
    baseSize += fontSize > 10 ? (fontSize - 10) * 0.6 : 0;
    return baseSize * text.length;
  }

  return getTextMeasureInstance().measure(text, font || {});
};
