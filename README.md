[![view on npm](http://img.shields.io/npm/v/transition-to-from-auto.svg)](https://www.npmjs.org/package/transition-to-from-auto)
[![npm module downloads per month](http://img.shields.io/npm/dm/transition-to-from-auto.svg)](https://www.npmjs.org/package/transition-to-from-auto)
[![Dependency Status](https://david-dm.org/75lb/transition-to-from-auto.svg)](https://david-dm.org/75lb/transition-to-from-auto)

# transition-to-from-auto
This module exports a single function to transition an element either to or from `auto`. At the moment, this is not possible (see [webkit](https://bugs.webkit.org/show_bug.cgi?id=16020) and [firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=571344) bugs).

[Demo](http://75lb.github.io/transition-to-from-auto/).

Compatible with CommonJS (browserify), AMD (requirejs) or plain JS.

## Synopsis
```js
transition({
  selector: "p",
  property: "height",
  style: "height 0.4s ease-in-out",
  to: "auto"
});
```
## Compatibility
[![Sauce Test Status](https://saucelabs.com/browser-matrix/ttfa.svg)](https://saucelabs.com/u/ttfa)


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
transition to and from auto

**Kind**: Exported function  
**Params**
- options <code>Object</code> - the options
  - .element <code>mixed</code> - the element or selector
  - .val <code>string</code> - the transition destination
  - [.prop] <code>string</code> - the CSS property to transition, defaults to `height`
  - [.style] <code>string</code> - the CSS transition style, defaults to css


* * *

&copy; 2015 Lloyd Brookes <75pound@gmail.com>. Documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown).
