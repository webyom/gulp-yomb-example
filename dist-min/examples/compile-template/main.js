define(["require","exports","module","jquery","./main.tpl.html"],function(e,t,r){(function(){var t,i;t=e("jquery"),i={},i.bar=function(){var r,i;return i=e("./main.tpl.html"),r=[{name:"foo"},{name:"bar"}],t("#foo-div").html(i.render(r))},r.exports=i}).call(this)}),define("./main.tpl.html",["require","exports","module","jquery","./items.tpl.html"],function(require,exports,module){exports.render=function($data,$opt){$data=$data||{};var _$out_=[];with($data){var itemsTpl=(require("jquery"),require("./items.tpl.html"));_$out_.push('<style type="text/css">/* trace:src/examples/compile-less/main.less *//* trace:src/examples/compile-less/box.less */.box { width: 200px; height: 200px;}.building { width: 200px; height: 200px;}</style>'),_$out_.push('<style type="text/css">/* trace:src/examples/compile-sass/main.scss *//* trace:src/examples/compile-sass/box.scss */.building { width: 200px; height: 200px; }</style><ul>',itemsTpl.render($data),"</ul><ul>"),function(){with($data){var $=require("jquery");$.each(items,function(e,t){_$out_.push("<li>",t.name,"</li>")})}}(),_$out_.push("</ul>")}return _$out_.join("")}}),define("./items.tpl.html",["require","exports","module","jquery"],function(require,exports,module){function $encodeHtml(e){return(e+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/`/g,"&#96;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")}exports.render=function($data,$opt){$data=$data||{};var _$out_=[];with($data){var $=require("jquery");$.each(items,function(e,t){_$out_.push("<li>",$encodeHtml(t.name),"</li>")})}return _$out_.join("")}});