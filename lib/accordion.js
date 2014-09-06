/**
Add `data-accordion` to each child of a node that you'd like accordion behaviour on.

@example
<ul>
    <li data-accordion>
        <p>Hello</p>
        <div data-accordion-panel>
            This part will be expanded on click of the parent [data-accordion].
        </div>
    </li>
    <li data-accordion>
        <p>World</p>
        <div data-accordion-panel>
            All other panels are closed when another is opened.
        </div>
    </li>
    <li>
        no accordion behaviour on this item.
    </li>
</ul>
*/
define([ "jquery" ], function ($) {
    return function accordion(options){
        var transition = options.transition || "height 0.4s ease-in-out";

        function fromAuto(panel){
            if (panel instanceof $){
                for (var i = 0; i < panel.length; i++){
                    fromAuto(panel[i]);
                }
                return;
            };
            if (panel.style.height === "auto"){
                panel.style.height = getComputedStyle(panel).height;
                panel.offsetHeight // force repaint;

                /* important so set the transition here and not in CSS, to avoid FOUC */
                panel.style.transition = transition;
                panel.style.height = "0px";
            	setTimeout(function() {
            		panel.style.transition = "";
            	}, 400);

                $(panel).data("expanded", false);
            }
        }
        function toAuto(panel){
            if (panel instanceof $){
                for (var i = 0; i < panel.length; i++){
                    toAuto(panel[i]);
                }
                return;
            };
            var prevHeight = panel.style.height;
            panel.style.height = "auto";
            var endHeight = getComputedStyle(panel).height;
            panel.style.height = prevHeight;
            panel.offsetWidth; // force repaint

            /* important so set the transition here and not in CSS, to avoid FOUC */
            panel.style.transition = transition;
            panel.style.height = endHeight;
            panel.addEventListener("transitionend", function transitionEnd(event) {
            	if (event.propertyName == "height") {
            		panel.style.transition = "";
            		panel.style.height = "auto";
            		panel.removeEventListener("transitionend", transitionEnd);
            	}
            });

            $(panel).data("expanded", true);
        }

        function onAccordionClick(e){
            e.stopPropagation();
            var $this = $(this);
            var $otherPanels = $this.siblings().children("[data-accordion-panel]");
            if ($otherPanels){
                fromAuto($otherPanels);
            }

            var $panel = $this.children("[data-accordion-panel]");

            if ($panel.data("expanded")){
                fromAuto($panel);
            } else {
                toAuto($panel);
            }
        }

        $(options.activateOn).on("click", onAccordionClick);

        /* by default, links (with an href) within a panel will not trigger the
        expand/collapse anim */
        $("[data-accordion-panel] a[href]").on("click", function(e){
            e.stopPropagation();
        });

        /* you can declaritively prevent the anim happening on other panel children by
        setting 'data-accordion-target' */
        $("[data-accordion-panel] [data-accordion-target]").on("click", function(e){
            e.stopPropagation();
        });
    }
});
