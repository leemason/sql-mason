var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {
    compileMethodInsert: function(){
        var statements = [];

        statements.push('insert');

        statements.push('into');

        statements.push(e.escapeId(this.getTable()));

        statements.push(this.compileInsertKeys());

        statements.push('values');

        statements.push(this.compileInsertBindings());

        return _.compact(statements).join(' ') + ';';
    },

    compileInsertKeys: function(){
        var statements = [];

        this.getInsertKeys().forEach(function(column){
            statements.push(e.escapeId(column));
        });

        return '(' + _.compact(statements).join(', ') + ')';
    },

    compileInsertBindings: function(){

        var statements = [];

        var length = 1;

        if(_.isArray(this._builder.insert)){
            length = this._builder.insert.length;
        }

        for(i = 0;i < length;i++){
            var inner = [];
            this.getInsertKeys().forEach(function(){
                inner.push('?');
            });
            statements.push(inner.join(', '));
        }

        this.getInsertBindings().forEach(function(){
            //statements.push('?');
        });

        return '(' + _.compact(statements).join('), (') + ')';
    }
}