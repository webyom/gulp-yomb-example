define(["require","exports","module","jquery","./foo"],function(e){var r=(e("jquery"),e("./foo"));return{bar:function(){r.bar()}}}),define("./foo",["require","exports","module","jquery","./bar"],function(e){var r=(e("jquery"),e("./bar"));return{bar:function(){r.baz()}}}),define("./bar",["require","exports","module","jquery","../simple/foo"],function(e){var r=(e("jquery"),e("../simple/foo"));return{baz:function(){r.bar()}}}),define("../simple/foo",["require","exports","module","jquery","../package-dependancy/foo"],function(e){e("jquery"),e("../package-dependancy/foo");return{bar:function(){alert("Hello world!")}}});