---
title: Getting started (node.js)
description: A minimal example of how the odt-templater is used in node.js
date: 2025-09-04
---

# Getting started (node.js)

## Installation

The odt-templater is available as a [NPM package](https://www.npmjs.com/package/odt-templater).

```bash
npm i odt-templater
```

## Setup

The odt templater requires the content of the ODT file as a string as a parameter. The content must be read from the `content.xml` file within the ODT file. Any ZIP library, such as [JSZip](https://www.npmjs.com/package/jszip) or [PizZip](https://www.npmjs.com/package/pizzip?activeTab=code), can be used for this task.

```js
const { OdtTemplater } = require("odt-templater");
const fs = require("fs");
const PizZip = require("pizzip");

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
const templateBuffer = fs.readFileSync("./template.odt");
const zip = new PizZip(templateBuffer);
const contentFile = zip.file("content.xml");
if (!contentFile) throw new Error("content.xml not found in the ODT file.");
const content = contentFile.asText();

// 2. Initialize OdtTemplater and render the document
const templater = new OdtTemplater(content);
const renderedContent = templater.render(data);

// 3. Replace the content in the ZIP
zip.file("content.xml", renderedContent);

// 4. Generate the output ODT file
const outputBuffer = zip.generate({ type: "nodebuffer" });
fs.writeFileSync("./output.odt", outputBuffer);
```
