var transition = require("../");

var $ = document.querySelector.bind(document);

$("#btnFrom").addEventListener("click", function(){
  transition({
    element: "p",
    val: "100px",
    style: "all 1s"
  });
});
$("#btnTo").addEventListener("click", function(){
  transition({
    element: "p",
    val: "auto",
    style: "all 1s"
  });
});
$("#btnAdd").addEventListener("click", function(){
  $("p").textContent += " But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?";
});
