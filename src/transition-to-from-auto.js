/**
@module
@alias transition
*/
(function(window, document){
    "use strict";

    var getComputedStyle = window.getComputedStyle;
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