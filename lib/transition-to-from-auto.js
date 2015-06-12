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

    function process(el, prop, val, transitionStyle, onend) {
        var style = el.style;

        /* avoid transition flashes in Safari */
        style[transitionProp] = "none";
        el.offsetWidth; // force repaint

        style[transitionProp] = transitionStyle;
        style[prop] = val;

        el.setAttribute(isTransition, true);
        el.addEventListener(transitionEnd, function transitionEndListener(event) {
            if(event.propertyName === prop) {
                el.removeEventListener(transitionEnd, transitionEndListener);
                el.removeAttribute(isTransition);
                /* avoid transition flashes in Safari */
                style[transitionProp] = "none";

                onend && onend();
            }
        });
    }

    function fromAuto(el, options){
        var val = options.val;
        var prop = options.prop;
        var style = el.style;

        var currValue = getComputedStyle(el)[prop];
        if (currValue === val) {
            return;
        }
        style[prop] = currValue;

        process(el, prop, val, options.style);
    }

    function toAuto(el, options){
        var val = "auto";
        var prop = options.prop;
        var style = el.style;

        var currValue = style[prop];
        if (currValue === val) {
            return;
        }

        if(currValue === "") {
            currValue = getComputedStyle(el)[prop];
        }

        style[prop] = val;
        val = getComputedStyle(el)[prop];
        if(val === currValue) {
            return;
        }
        style[prop] = currValue;

        process(el, prop, val, options.style, function () {
            style[prop] = "auto";
        });
    }

    /**
    transition to and from auto
    @param options {Object} - the options
    @param options.element {mixed} - the element or selector
    @param options.val {string} - the transition destination
    @param [options.prop] {string} - the CSS property to transition, defaults to `width`
    @param [options.style] {string} - the CSS transition style, defaults to `all 0.4s ease-in-out`
    @alias module:transition-to-from-auto
    */
    function transition(options){
        var element = options.element;

        if(typeof element === "string") {
            element = document.querySelector(element);
        }

        element = element instanceof Node ? element : false;
        options.style = options.style || "all 0.4s ease-in-out";
        var prop = options.prop = options.prop || "height";
        var val = options.val;
        
        if (element && val && ! element.hasAttribute(isTransition)) {
            if(transitionProp) {
                if (val === "auto"){
                    toAuto(element, options);
                } else {
                    fromAuto(element, options);
                }
            } else {
                element.style[prop] = val;
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
