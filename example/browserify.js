var ttfa = require("../");

var $ = document.querySelector.bind(document);

$("#fromClick").addEventListener("click", function(){
  ttfa.fromAuto("p", "height", "100px");
});
$("#toClick").addEventListener("click", function(){
  ttfa.toAuto("p", "height");
});
