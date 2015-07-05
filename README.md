[![view on npm](http://img.shields.io/npm/v/transition-to-from-auto.svg)](https://www.npmjs.org/package/transition-to-from-auto)
[![npm module downloads per month](http://img.shields.io/npm/dm/transition-to-from-auto.svg)](https://www.npmjs.org/package/transition-to-from-auto)
[![Dependency Status](https://david-dm.org/75lb/transition-to-from-auto.svg)](https://david-dm.org/75lb/transition-to-from-auto)

# transition-to-from-auto
This module exports a single function to transition an element's height or width to or from `auto`. At the moment, this is not possible (see [webkit](https://bugs.webkit.org/show_bug.cgi?id=16020) and [firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=571344) bugs).

[Demo](http://75lb.github.io/transition-to-from-auto/).

Compatible with CommonJS (browserify), AMD (requirejs) or plain JS.

## Synopsis
Transition the height of the `p.bio` element from its current value to `auto`:
```js
transition({
  element: "p.bio",
  prop: "height",
  style: "height 0.4s ease-in-out",
  val: "auto"
});
```

Assuming that `p.bio` already has a `transition` value defined in CSS, and that you're transitioning `height` (the default property), it can be written more concisely like this: 
```js
transition({ element: "p.bio", val: "250px" });
```

## Install
```sh
$ npm install transition-to-from-auto --save
```
or 
```sh
$ bower install transition-to-from-auto --save
```
*Mac / Linux users may need to run with `sudo`*.

## Usage
See the [example](https://github.com/75lb/transition-to-from-auto/tree/master/example) folder for examples.

## API
<a name="exp_module_transition-to-from-auto--transition"></a>
### transition(options) ⏏
**Kind**: Exported function  
**Params**
- options <code>Object</code>
  - .element <code>string</code> | <code>element</code> - The DOM element or selector to transition
  - .val <code>string</code> - The value you want to transition to
  - [.prop] <code>string</code> - The CSS property to transition, defaults to `"height"`
  - [.style] <code>string</code> - The desired value for the `transition` CSS property (e.g. `"height 1s"`). If specified, this value is added inline and will override your CSS. Leave this value blank if you already have it defined in your stylesheet.


* * *

&copy; 2015 Lloyd Brookes <75pound@gmail.com>. Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown).
