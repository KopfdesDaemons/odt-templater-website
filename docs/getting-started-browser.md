---
tilte: odt-templater - Getting started (Browser)
description: A minimal example of how the odt-templater is used in the browser
date: 2025-09-04
---

# Getting started (Browser)

## Installation

The odt-templater is available as a [NPM package](https://www.npmjs.com/package/odt-templater).

```bash
npm i odt-templater
```

```js
import { OdtTemplater } from "odt-templater";
```

You can also embed the odt-templater from a CDN.

```js
import { OdtTemplater } from "https://cdn.jsdelivr.net/npm/odt-templater/dist/esm/index.js";
```

## Setup

The odt templater requires the content of the ODT file as a string as a parameter. The content must be read from the `content.xml` file within the ODT file. Any ZIP library, such as [JSZip](https://www.npmjs.com/package/jszip) or [PizZip](https://www.npmjs.com/package/pizzip?activeTab=code), can be used for this task.

There is a [GitHub repository](https://github.com/KopfdesDaemons/odt-templater-examples) with the following example.

```js
async function generateOdtDocument() {
  const data = {
    title: "Hello World",
    description: "A wonderful text",
    user: {
      first_name: "John",
      last_name: "Doe",
      city: "New York",
      age: 30,
      email: "john.doe@example.com",
      website: "https://example.com",
    },
  };

  // 1. Load the ODT template file
  const response = await fetch("template.odt");
  const templateArrayBuffer = await response.arrayBuffer();

  // 2. Get the content.xml from the ODT file
  const jszip = new JSZip();
  const zip = await jszip.loadAsync(templateArrayBuffer);
  const contentFile = zip.file("content.xml");
  if (!contentFile) throw new Error("content.xml not found in the ODT file.");
  const content = await contentFile.async("string");

  // 3. Initialize OdtTemplater and render the document
  const templater = new OdtTemplater(content);
  const renderedContent = templater.render(data);

  // 4. Replace the content in the ZIP
  zip.file("content.xml", renderedContent);

  // 5. Generate the output ODT file as a Blob
  const outputBlob = await zip.generateAsync({ type: "blob" });

  // 6. Create a download link and trigger the download
  const url = URL.createObjectURL(outputBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "output.odt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.getElementById("generateBtn").addEventListener("click", generateOdtDocument);
```
