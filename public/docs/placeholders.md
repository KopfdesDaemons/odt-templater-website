---
title: odt-templater - Placeholders
description: Use placeholders in your ODT templates
date: 2025-09-04
---

# Placeholders

## Placeholders syntax

Placeholders are defined in the ODT template file with curly braces. The following syntax is supported:

Single key placeholders:

```
{key}
```

(Replaces with the value of `data[key]`)

Nested key placeholders:

```
{key.key}
```

(Replaces with the value of `data[key][key]`)

An space can be added between the braces and the key:

```
{ key }
{ key.key }
```

### Example

```
{ title }

Hello {user.first_name} {user.last_name}!

This is an example.
{ description }
```

## Rendering

Define your placeholders in the `data` object.

```js
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
```

Render the document with the render method.

```js
const templater = new OdtTemplater(content);
const renderedContent = templater.render(data);
```
