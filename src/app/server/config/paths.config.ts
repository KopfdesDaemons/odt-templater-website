import path from 'path';
import { fileURLToPath } from 'url';

// folder and file paths
export const SERVER_DIST_FOLDER = path.dirname(fileURLToPath(import.meta.url));
export const PUBLIC_FOLDER_PATH = path.join('./public');
export const DOCS_FOLDER_PATH = path.join(PUBLIC_FOLDER_PATH, '/docs');
