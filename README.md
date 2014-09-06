[![view on npm](http://img.shields.io/npm/v/transition-to-from-auto.svg)](https://www.npmjs.org/package/transition-to-from-auto)
[![npm module downloads per month](http://img.shields.io/npm/dm/transition-to-from-auto.svg)](https://www.npmjs.org/package/transition-to-from-auto)
[![Dependency Status](https://david-dm.org/75lb/transition-to-from-auto.svg)](https://david-dm.org/75lb/transition-to-from-auto)

#transition-to-from-auto
At the moment, CSS transitions to and from `auto` are broken (see [webkit](https://bugs.webkit.org/show_bug.cgi?id=16020) and [firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=571344) bugs). This module is a workaround. 

##Synopsis
```js
ttfa.fromAuto(".myElement", "width", "100px");
```

```js
ttfa.toAuto(".myElement", "width");
```

##Install
```sh
$ npm install transition-to-from-auto --save
```
*Mac / Linux users may need to run with `sudo`*.

or 
```sh
$ bower install transition-to-from-auto --save
```

*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*
