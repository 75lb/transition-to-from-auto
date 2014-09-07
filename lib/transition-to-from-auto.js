/**
@module
@alias transition
*/
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

    /**
    transition to and from auto
    @param options {Object} - the options
    @param options.selector {string} - the element selector 
    @param options.to {string} - the value to transition to
    @param [options.property] {string} - the CSS property to transition, defaults to `width`
    @param [options.style] {string} - the CSS transition style, defaults to `all 0.4s ease-in-out`
    @alias module:transition-to-from-auto
    */
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
