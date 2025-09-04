import * as fs from 'fs';
import { DOCS_FOLDER_PATH } from '../config/paths.config';
import path from 'path';
import { MarkdownHelper } from '../../helpers/markdown';
import { DocMeta } from '../../models/doc-meta';

export const getAllDocsTitles = async (): Promise<Record<string, string>[]> => {
  const allDocs = await fs.promises.readdir(DOCS_FOLDER_PATH);
  const titles: string[] = [];
  for (const file of allDocs) {
    if (path.extname(file) === '.md') {
      const markdownFile = await fs.promises.readFile(
        path.join(DOCS_FOLDER_PATH, file),
        'utf8'
      );
      const metadata = MarkdownHelper.extractYamlHeader(markdownFile);
      if (metadata && (metadata as DocMeta).title) {
        titles.push(path.basename(file, '.md'));
      }
    }
  }
  return titles.map((title) => ({ fileName: title }));
};
