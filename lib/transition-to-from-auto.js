/**
@module
@alias transition
*/
(function(window, document){
    "use strict";

    var getComputedStyle = window.getComputedStyle;
    var Node = window.Node;
    var isTransition = "data-ttfaInTransition";
    var transitionProp = false;
    var transitionEnd = false;

    (function () {
        var style = document.createElement("a").style;
        var prop;

        if(style[prop = "webkitTransition"] !== undefined) {
            transitionProp = prop;
            transitionEnd = prop + "End";
        }

        if(style[prop = "transition"] !== undefined) {
            transitionProp = prop;
            transitionEnd = prop + "end";
        }
    } ());

    function fromAuto(el, options){
        var val = options.to;
        var property = options.property;

        if (el.hasAttribute(isTransition)) {
            return;
        }

        var currValue = getComputedStyle(el)[property];
        if (currValue === val) {
            return;
        }

        if(transitionProp) {
            /* avoid transition flashes in Safari */
            el.style[transitionProp] = "none";
            el.style[property] = currValue;
            el.offsetWidth; // force repaint

            el.style[transitionProp] = options.style;
            el.style[property] = val;

            el.setAttribute(isTransition, true);
            el.addEventListener(transitionEnd, function transitionEndListener(event) {
                if(event.propertyName === property) {
                    el.removeAttribute(isTransition);
                    el.style[transitionProp] = "";
                    el.removeEventListener(transitionEnd, transitionEndListener);
                }
            });
        } else {
            el.style[property] = val;
        }
    }

    function toAuto(el, options){
        var property = options.property;

        if(el.hasAttribute(isTransition)) {
            return;
        }

        var currValue = el.style[property];
        if (currValue === "auto" || currValue === "") {
            return;
        }

        el.style[property] = "auto";
        if(transitionProp) {
            /* avoid transition flashes in Safari */
            el.style[transitionProp] = "none";
            var endValue = getComputedStyle(el)[property];
            el.style[property] = currValue;
            el.offsetWidth; // force repaint

            el.style[transitionProp] = options.style;
            el.style[property] = endValue;

            el.setAttribute(isTransition, true);
            el.addEventListener(transitionEnd, function transitionEndListener(event) {
                if(event.propertyName === property) {
                    el.removeAttribute(isTransition);
                    /* avoid transition flashes in Safari */
                    el.style[transitionProp] = "none";
                    el.style[property] = "auto";
                    el.removeEventListener(transitionEnd, transitionEndListener);
                }
            });
        }
    }

    function getElement(element) {
        if(typeof element === "string") {
            element = document.querySelector(element);
        }

        if(element instanceof Node) {
            return element;
        }
    }

    /**
    transition to and from auto
    @param options {Object} - the options
    @param options.element {mixed} - the element or selector
    @param options.to {string} - the value to transition to
    @param [options.property] {string} - the CSS property to transition, defaults to `width`
    @param [options.style] {string} - the CSS transition style, defaults to `all 0.4s ease-in-out`
    @alias module:transition-to-from-auto
    */
    function transition(options){
        var element = getElement(options.element);
        options.property = options.property || "width";
        options.style = options.style || "all 0.4s ease-in-out";
        
        if (element && options.to) {
            if (options.to === "auto"){
                toAuto(element, options);
            } else {
                fromAuto(element, options);
            }
        }
    }

    transition.transitionProp = transitionProp;
    transition.transitionEnd = transitionEnd;

    if (typeof module !== "undefined" && module.exports){
        module.exports = transition;
    } else if (typeof define === "function" && define.amd){
        define(function(){
            return transition;
        });
    } else {
        window.transition = transition;
    }
})(window, document);
