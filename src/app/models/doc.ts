import { DocMeta } from './doc-meta';

export class Doc {
  docMeta: DocMeta;
  docContent?: string;

  constructor(
    metaObject: Partial<DocMeta>,
    fileName: string,
    postContent?: string
  ) {
    this.docMeta = new DocMeta(fileName);
    this.docMeta.initFromObject(metaObject);
    this.docContent = postContent;
  }
}
