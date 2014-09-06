(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ttfa = require("../");

var $ = document.querySelector.bind(document);

$("#class="$1" data-accordion-panel").addEventListener("click", function(){
  ttfa.fromAuto("p", "height", "100px");
});
$("#btnTo").addEventListener("click", function(){
  ttfa.toAuto("p", "height");
});

},{"../":2}],2:[function(require,module,exports){
(function(){
    "use strict";
    
    var $ = document.querySelector.bind(document);
    var transition = "all 0.4s ease-in-out";

    function fromAuto(selector, property, to){
        property = property || "width";
        var el = $(selector);

        el.style[property] = getComputedStyle(el)[property];
        el.offsetWidth; // force repaint

        /* important so set the transition late (not in CSS), to avoid FOUC */
        el.style.transition = transition;
        el.style[property] = to;
    	setTimeout(function() {
    		el.style.transition = "";
    	}, 400);
    }

    function toAuto(selector, property){
        property = property || "width";
        var el = $(selector);

        var prevValue = el.style[property];
        el.style[property] = "auto";
        var endValue = getComputedStyle(el)[property];
        el.style[property] = prevValue;
        el.offsetWidth; // force repaint

        /* important so set the transition late (not in CSS), to avoid FOUC */
        el.style.transition = transition;
        el.style[property] = endValue;
        el.addEventListener("transitionend", function transitionEnd(event) {
    		el.style.transition = "";
    		el.style[property] = "auto";
    		el.removeEventListener("transitionend", transitionEnd);
        });
    }

    var ttfa = {
        fromAuto: fromAuto,
        toAuto: toAuto
    };
    
    if (typeof module !== "undefined" && module.exports){
        module.exports = ttfa;
    } else if (typeof window !== "undefined"){
        window.ttfa = ttfa;
    }
})();

},{}]},{},[1]);
