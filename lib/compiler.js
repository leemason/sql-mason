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
    },

    compileMethodSelect: function(){
        var statements = [];

        statements.push('select');

        statements.push(this.isDistinct() === true ? 'distinct' : '');

        statements.push(this.compileSelects());

        statements.push('from');

        statements.push(e.escapeId(this.getTable()));

        statements.push(this.compileWheres());

        return _.compact(statements).join(' ') + ';';
    },

    compileSelects: function(){
        var statements = [];

        this.getSelects().forEach(function(column){
            statements.push(e.escapeId(column));
        });

        return _.compact(statements).join(', ');
    }

}));

_.assign(Compiler.prototype, require('./compiler/where'));

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