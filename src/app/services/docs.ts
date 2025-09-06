import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  makeStateKey,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { MarkdownHelper } from '../helpers/markdown';
import { Doc } from '../models/doc';
import { HighlightHelper } from '../helpers/highlight';

@Injectable({
  providedIn: 'root',
})
export class Docs {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
  private markdownHelper = MarkdownHelper;
  private platformId = inject<object>(PLATFORM_ID);

  private doc: Doc | null | undefined;

  async getDoc(fileName: string): Promise<Doc> {
    this.doc = this.loadDocFromTransfareState(fileName);
    if (!this.doc) this.doc = await this.loadFromMarkdownFile(fileName);
    this.savePostTransfereState(fileName);
    return this.doc;
  }

  private savePostTransfereState(title: string) {
    const key = makeStateKey<Doc>('post-' + title);
    this.transferState.set(key, this.doc);
  }

  private loadDocFromTransfareState(title: string): Doc | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const key = makeStateKey<Doc>('post-' + title);
    const postFromState = this.transferState.get(key, null);
    if (!postFromState) return null;
    const post = new Doc(postFromState?.docMeta ?? {}, title);
    post.docContent = postFromState?.docContent;
    return post;
  }

  private async loadFromMarkdownFile(fileName: string): Promise<Doc> {
    const contentUrl = `/docs/${fileName}.md`;

    const response = await lastValueFrom(
      this.http.get(contentUrl, {
        responseType: 'text',
        observe: 'response',
        headers: { Accept: 'text/plain' },
        transferCache: { includeHeaders: ['Content-Type'] },
      })
    );

    const markdownFile = response.body as string;
    const markdownHeader = this.markdownHelper.extractYamlHeader(markdownFile);
    let markdownBody = this.markdownHelper.extractBody(markdownFile);

    const codeBlocksRegex = /```(\S*)\s([\s\S]*?)```/g;

    const finalMarkdownBody = markdownBody.replace(
      codeBlocksRegex,
      (match, lang, code) => {
        const cleanedCode = code.trim();

        const highlightedCode = HighlightHelper.highlightElement(
          cleanedCode,
          lang
        );

        return `<pre><code class="language-${lang}">${highlightedCode}</code></pre>`;
      }
    );

    const highlightedContent = await this.markdownHelper.parseMarkdown(
      finalMarkdownBody
    );

    return new Doc(markdownHeader, fileName, highlightedContent);
  }
}
