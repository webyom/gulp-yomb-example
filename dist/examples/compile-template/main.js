/* trace:src/examples/compile-template/main.coffee */
define(['require', 'exports', 'module', 'jquery', './main.tpl.html'], function(require, exports, module) {
(function() {
  var $, foo;

  $ = require('jquery');

  foo = {};

  foo.bar = function() {
    var data, tpl;
    tpl = require('./main.tpl.html');
    data = [
      {
        name: 'foo'
      }, {
        name: 'bar'
      }
    ];
    return $('#foo-div').html(tpl.render(data));
  };

  module.exports = foo;

}).call(this);

});

/* trace:src/examples/compile-template/main.tpl.html */
define('./main.tpl.html', ['require', 'exports', 'module', "jquery", "./items.tpl.html"], function(require, exports, module) {
    function $encodeHtml(str) {
        return (str + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/`/g, "&#96;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    }
    exports.render = function($data, $opt) {
        $data = $data || {};
        var _$out_ = [];
        var $print = function(str) {
            _$out_.push(str);
        };
        with ($data) {
            /* trace:src/examples/compile-template/main.tpl.html */
            var $ = require("jquery");
            var itemsTpl = require("./items.tpl.html");
            /* trace:src/examples/compile-less/main.less */
            _$out_.push('<style type="text/css">/* trace:src/examples/compile-less/main.less *//* trace:src/examples/compile-less/box.less */.box { width: 200px; height: 200px;}.building { width: 200px; height: 200px;}</style>');
            /* trace:src/examples/compile-sass/main.scss */
            _$out_.push('<style type="text/css">/* trace:src/examples/compile-sass/main.scss *//* trace:src/examples/compile-sass/box.scss */.building { width: 200px; height: 200px; }</style><ul>', itemsTpl.render($data), "</ul><ul>");
            (function() {
                with ($data) {
                    /* trace:src/examples/compile-template/mixin.tpl.html */
                    var $ = require("jquery");
                    $.each(items, function(i, item) {
                        _$out_.push("<li>", item.name, "</li>");
                    });
                }
            })();
            _$out_.push("</ul>");
        }
        return _$out_.join("");
    };
});

/* trace:src/examples/compile-template/items.tpl.html */
define('./items.tpl.html', ['require', 'exports', 'module', "jquery"], function(require, exports, module) {
    function $encodeHtml(str) {
        return (str + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/`/g, "&#96;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    }
    exports.render = function($data, $opt) {
        $data = $data || {};
        var _$out_ = [];
        var $print = function(str) {
            _$out_.push(str);
        };
        with ($data) {
            /* trace:src/examples/compile-template/items.tpl.html */
            var $ = require("jquery");
            $.each(items, function(i, item) {
                _$out_.push("<li>", $encodeHtml(item.name), "</li>");
            });
        }
        return _$out_.join("");
    };
});