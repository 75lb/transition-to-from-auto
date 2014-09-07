(function(){
    "use strict";

    var $ = document.querySelector.bind(document);
    var transition = "all 0.4s ease-in-out";
    var isInTransition = false;

    function fromAuto(selector, property, to){
        var el = $(selector);
        property = property || "width";

        if (el.dataset.ttfaInTransition === "true") return;

        var currValue = getComputedStyle(el)[property];
        if (currValue === to) return;
        
        el.dataset.ttfaInTransition = true;

        el.style[property] = currValue;
        el.offsetWidth; // force repaint

        /* important so set the transition late (not in CSS), to avoid FOUC */
        el.style.transition = transition;
        el.style[property] = to;
        el.addEventListener("transitionend", function transitionEnd(event) {
            delete el.dataset.ttfaInTransition;
    		el.style.transition = "";
    		el.removeEventListener("transitionend", transitionEnd);
        });
    }

    function toAuto(selector, property){
        var el = $(selector);
        property = property || "width";

        if(el.dataset.ttfaInTransition === "true") return;
        var prevValue = el.style[property];
        if (prevValue === "auto" || prevValue === "") return;

        el.dataset.ttfaInTransition = true;

        el.style[property] = "auto";
        var endValue = getComputedStyle(el)[property];
        el.style[property] = prevValue;
        el.offsetWidth; // force repaint

        /* important so set the transition late (not in CSS), to avoid FOUC */
        el.style.transition = transition;
        el.style[property] = endValue;
        el.addEventListener("transitionend", function transitionEnd(event) {
            delete el.dataset.ttfaInTransition;
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
    } else if (typeof define === "function" && define.amd){
        define(ttfa);
    } else if (typeof window !== "undefined"){
        window.ttfa = ttfa;
    }
})();
