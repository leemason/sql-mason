var Compiler = require('./lib/compiler'),
    _ = require('lodash');


/*
var QueryMason = function(){
    Compiler.apply(this);
}

QueryMason.prototype = _.create(Compiler.prototype, _.assign({
    '_super': Compiler.prototype,
    'constructor': QueryMason
}, {}));
*/

var QueryMason = Compiler.extend({});

module.exports = QueryMason;