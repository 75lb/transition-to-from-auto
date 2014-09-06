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
    } else if (typeof define === "function" && define.amd){
        define(ttfa);
    } else if (typeof window !== "undefined"){
        window.ttfa = ttfa;
    }
})();
