var ttfa = require("../");

var $ = document.querySelector.bind(document);

$("#btnFrom").addEventListener("click", function(){
  ttfa.fromAuto("p", "height", "100px");
});
$("#btnTo").addEventListener("click", function(){
  ttfa.toAuto("p", "height");
});
