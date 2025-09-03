import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('typescript', typescript);

export abstract class HighlightHelper {
  static highlightElement(element: string) {
    return hljs.highlight(element, { language: 'typescript' }).value;
  }
}
