var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {
    compileJoins: function(){

        var statements = [];

        this.getJoins().forEach(function(join, index){
            var method = 'compileJoin' + join.type;

            statements.push(this[method](join));
        }.bind(this));

        return _.compact(statements).join(' ');
    },

    compileJoinRaw: function(join){
        return join.connector + ' ' + join.value;
    },

    compileJoinSimple: function(join){
        return join.connector + ' ' + e.escapeId(join.table) + ' on ' + e.escapeId(join.key) + ' = ' + e.escapeId(join.value);
    },

    compileJoinBuilder: function(join){
        return join.connector + ' ' + e.escapeId(join.builder.getTable()) + ' on ' + this.compileJoinCb(join.builder);
    },

    compileJoinCb: function(builder){
        var statements = [];
        builder.getJoinOns().forEach(function(on, index){

            if(index != 0){
                statements.push(on.connector);
            }
            statements.push(e.escapeId(on.key));
            statements.push(on.operator);
            statements.push(e.escapeId(on.value));
        });
        return _.compact(statements).join(' ');
    }
}