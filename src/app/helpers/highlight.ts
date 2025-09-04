import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

export abstract class HighlightHelper {
  static highlightElement(element: string, lang: string): string {
    if (lang === 'js') lang = 'javascript';
    else return element;
    return hljs.highlight(element, { language: lang }).value;
  }
}
