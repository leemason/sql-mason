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
    },

    compileWheres: function(){

        if(this.getWheres().length === 0){
            return;
        }

        var statements = [];

        statements.push('where');

        this.getWheres().forEach(function(where, index){
            if(index !== 0){
                statements.push(where.connector);
            }
            var method = 'compileWhere' + where.type;

            statements.push(this[method](where));
        }.bind(this));

        return _.compact(statements).join(' ');
    },

    compileWhereRaw: function(where){

    },

    compileWhereOperator: function(where){

    },

    compileWhereBetween: function(where){

    },

    compileWhereNotBetween: function(where){

    },

    compileWhereIn: function(where){

    },

    compileWhereNotIn: function(where){

    },

    compileWhereNull: function(where){

    },

    compileWhereNotNull: function(where){

    },

    compileWhereBuilder: function(where){

    },

    compileWhereExists: function(where){

    },

}));

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