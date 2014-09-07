require([ "../lib/transition-to-from-auto" ], function(transition){

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
    
});

