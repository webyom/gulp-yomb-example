/* trace:src/examples/write-like-nodejs/coffee-main.coffee */
define(['require', 'exports', 'module', 'jquery'], function(require, exports, module) {
(function() {
  var $, foo;

  $ = require('jquery');

  foo = {};

  foo.bar = function() {
    return alert('Hello world!');
  };

  module.exports = foo;

}).call(this);

});