var Builder = require('./builder'),
    _ = require('lodash'),
    Escaper = require('./escaper'),
    e = new Escaper();

var Compiler = function(){
    Builder.apply(this);
}

Compiler.prototype = _.create(Builder.prototype, _.assign({
    '_super': Builder.prototype,
    'constructor': Compiler
}, {

    toSql: function(){

        var compiler = 'compileMethod' + this._builder.method;

        return this[compiler]();
    }

}));

_.assign(Compiler.prototype, require('./compiler/where'));

_.assign(Compiler.prototype, require('./compiler/select'));

_.assign(Compiler.prototype, require('./compiler/insert'));

_.assign(Compiler.prototype, require('./compiler/update'));

_.assign(Compiler.prototype, require('./compiler/delete'));

_.assign(Compiler.prototype, require('./compiler/truncate'));

_.assign(Compiler.prototype, require('./compiler/groupby'));

_.assign(Compiler.prototype, require('./compiler/having'));

_.assign(Compiler.prototype, require('./compiler/union'));

_.assign(Compiler.prototype, require('./compiler/orderby'));

_.assign(Compiler.prototype, require('./compiler/limit'));

Compiler.extend = function(props){
    var child = function(){
        Compiler.apply(this);
    }
    child.prototype = _.create(Compiler.prototype, _.assign({
        '_super': Compiler.prototype,
        'constructor': child
    }, props || {}));

    return child;
}


module.exports = Compiler;