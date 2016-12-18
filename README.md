# oRotter Bootstrap

A CSS toolset for building oRotter application.

## Table of Contents

- [Start](#start)
- [Principle](#principle)
- [Components](#components)
- [Utilities](#utilities)

## Start

```sh
$ npm install

# See example site page
$ npm run sites
```

## Principle

The style principle is accordance with [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md).

It mainly consists of two parts: **Components** and **Utilities**.

### Components

```html
<!-- Avatar component -->
<div class="Avatar Avatar--large">
    <img class="Avatar-image" src="...">
</div>
```

The component itself is named with pascal case (`Avatar` in this example). 

If the component has some options or **modifier**, you can set it as `component--modifier` class (`Avatar--large` in example).

Component's descendants are named as `component-element` class (`Avatar-image`).

Modifier and descendant are named with camel case. (`Avatar--extraLarge`, not `Avatar--extra-large`)

### Utilities

```html
<div class="u-textCenter">
    Some centerized text.
</div>
```

Utilities are used for styling some behaviors such as centerizing text, floating blocks, or positioning left etc.

These utilities' classes are prefixed with `u-`, and camel case behavior names are following.

## Components

### Button

```html
<button class="Button">Button</button>
<button class="Button Button--primary">Primary Button</button>
```

## Utilities

coming soon...
