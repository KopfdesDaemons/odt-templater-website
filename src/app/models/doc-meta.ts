export class DocMeta {
  fileName: string;
  title?: string;
  postURL?: string;
  keywords: string[] = [];
  description?: string;
  date?: Date;
  commentsDisabled: boolean = false;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  initFromObject(object: Partial<DocMeta>) {
    Object.assign(this, object);
    if (object.date) this.date = new Date(object.date);
  }
}
