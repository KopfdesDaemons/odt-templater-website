---
title: odt-templater - Conditionals
description: Use conditionals in your ODT templates
date: 2025-09-04
---

# Conditionals

## Conditionals syntax

Conditions are defined with curly braces, a hash mark, the key being checked, a double equal sign, and the value being compared.

### Inline conditionals

```js
{#key == value} Hello World {/}
{#key.key == value} Hello World {/}
```

An space can be added between the braces and the key:

```js
{ #key == value } Hello World {/}
{ #key.key == value } Hello World {/}
```

### Block conditionals

```js
{#key == value}
  Hello World
{/}
```

```js
{#user.first_name == John}
  Hello {user.first_name}
{/}
```

## Rendering

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
