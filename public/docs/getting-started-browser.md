---
tilte: Getting started (Browser)
description: A minimal example of how the odt-templater is used in the browser
date: 2025-09-03
---

# Getting started (Browser)

```typescript
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
