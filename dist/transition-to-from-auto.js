(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.transitionToFromAuto = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
@module transition-to-from-auto
*/
module.exports = transition;

var isTransition = "data-ttfaInTransition";
var elements = [];
var data = [];

// Transition detecting
var transitionProp = false;
var transitionEnd = false;
var testStyle = document.createElement("a").style;
var testProp;

if(testStyle[testProp = "webkitTransition"] !== undefined) {
    transitionProp = testProp;
    transitionEnd = testProp + "End";
}

if(testStyle[testProp = "transition"] !== undefined) {
    transitionProp = testProp;
    transitionEnd = testProp + "end";
}

function process(options, data) {
    var el = options.element;
    var val = options.val;
    var prop = options.prop;
    var style = el.style;
    var startVal;
    var autoVal;

    if(!transitionProp) {
        return style[prop] = val;
    }

    if(el.hasAttribute(isTransition)) {
        el.removeEventListener(transitionEnd, data.l);
    } else {
        style[transitionProp] = "none";

        startVal = getComputedStyle(el)[prop];
        style[prop] = "auto";
        autoVal = getComputedStyle(el)[prop];

        // Interrupt
        if(startVal === val || val === "auto" && startVal === autoVal) {
            return;
        }

        data.auto = autoVal;
        el.setAttribute(isTransition, 1);

        // Transition
        style[prop] = startVal;
        el.offsetWidth;
        style[transitionProp] = options.style;
    }

    style[prop] = val === "auto" ? data.auto : val;

    data.l = function (e) {
        if(e.propertyName === prop) {
            el.removeAttribute(isTransition);
            el.removeEventListener(transitionEnd, data.l);
            if(val === "auto") {
                /* avoid transition flashes in Safari */
                style[transitionProp] = "none";
                style[prop] = val;
            }
        }
    };

    el.addEventListener(transitionEnd, data.l);
}

/**
transition to and from auto
@param options {Object} - the options
@param options.element {mixed} - the element or selector
@param options.val {string} - the transition destination
@param [options.prop] {string} - the CSS property to transition, defaults to `height`
@param [options.style] {string} - the CSS transition style, defaults to css
@alias module:transition-to-from-auto
*/
function transition(options){
    var element = options.element;
    var datum;
    var index;

    if(typeof element === "string") {
        element = document.querySelector(element);
    }

    element = options.element = element instanceof Node ? element : false;
    options.prop = options.prop || "height";
    options.style = options.style || "";

    if(element) {
        index = elements.indexOf(element);
        if(~index) {
            datum = data[index];
        } else {
            datum = {};
            elements.push(element);
            data.push(datum);
        }

        process(options, datum);
    }
}

transition.prop = transitionProp;
transition.end = transitionEnd;

},{}]},{},[1])(1)
});