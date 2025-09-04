import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

export abstract class HighlightHelper {
  static highlightElement(element: string) {
    return hljs.highlight(element, { language: 'javascript' }).value;
  }
}
