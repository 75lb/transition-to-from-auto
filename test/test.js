var test = require("tape");
var ttfa = require("../");

test("transition works as described", function(t){
    t.fail("Test pre-transition state looks correct here");
    
    ttfa({
      element: "p.ttfa",
      val: "auto",
      style: 'height 2.4s'
    });
    
    t.fail("Test post-transition state looks correct here");
    
    t.end();
});
