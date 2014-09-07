(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var transition = require("../");

var $ = document.querySelector.bind(document);

$("#btnFrom").addEventListener("click", function(){
  transition({
    selector: "p",
    property: "height",
    style: "all 1s linear",
    to: "100px"
  });
});
$("#btnTo").addEventListener("click", function(){
  transition({
    selector: "p",
    property: "height",
    to: "auto"
  });
});
$("#btnAdd").addEventListener("click", function(){
  $("p").textContent += " But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?";
});

},{"../":2}],2:[function(require,module,exports){
(function(){
    "use strict";

    var $ = document.querySelector.bind(document);

    function fromAuto(options){
        var el = $(options.selector);
        var to = options.to;
        var property = options.property;

        if (el.dataset.ttfaInTransition === "true") return;
        var currValue = getComputedStyle(el)[property];
        if (currValue === to) return;
        
        el.dataset.ttfaInTransition = true;

        el.style[property] = currValue;
        el.offsetWidth; // force repaint

        /* important so set the transition late (not in CSS), to avoid transition flashes in Safari */
        el.style.transition = options.style;
        el.style[property] = to;
        el.addEventListener("transitionend", function transitionEnd(event) {
            delete el.dataset.ttfaInTransition;
    		el.style.transition = "";
    		el.removeEventListener("transitionend", transitionEnd);
        });
    }

    function toAuto(options){
        var el = $(options.selector);
        var property = options.property;

        if(el.dataset.ttfaInTransition === "true") return;
        var currValue = el.style[property];
        if (currValue === "auto" || currValue === "") return;

        el.dataset.ttfaInTransition = true;

        el.style[property] = "auto";
        var endValue = getComputedStyle(el)[property];
        el.style[property] = currValue;
        el.offsetWidth; // force repaint

        /* important so set the transition late (not in CSS), to avoid transition flashes in Safari */
        el.style.transition = options.style;
        el.style[property] = endValue;
        el.addEventListener("transitionend", function transitionEnd(event) {
            delete el.dataset.ttfaInTransition;
    		el.style.transition = "";
    		el.style[property] = "auto";
    		el.removeEventListener("transitionend", transitionEnd);
        });
    }

    function transition(options){
        options.property = options.property || "width";
        options.style = options.style || "all 0.4s ease-in-out";
        
        if (options.to === "auto"){
            toAuto(options);
        } else {
            fromAuto(options);
        }
    }

    if (typeof module !== "undefined" && module.exports){
        module.exports = transition;
    } else if (typeof define === "function" && define.amd){
        define(function(){
            return transition;
        });
    } else if (typeof window !== "undefined"){
        window.transition = transition;
    }
})();

},{}]},{},[1]);
