---
title: odt-templater - Empty conditionals
description: Use empty conditionals in your ODT templates
date: 2025-09-04
---

# Empty conditionals

## Conditionals syntax

Empty conditionals are defined with curly braces, a hash mark, and a key.

### Inline conditionals

```js
{#key} Hello World {/}
{#key.key} Hello World {/}
```

An space can be added between the braces and the key:

```js
{ #key } Hello World {/}
{ #key.key } Hello World {/}
```

### Block conditionals

```js
{#key}
  Hello World
{/}
```

```js
{#user.first_name}
  Hello {user.first_name}
{/}
```

## Rendering

Check your values for empty strings, null or undefined values.

Define your values in the `data` object.

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
