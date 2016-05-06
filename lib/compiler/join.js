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
        return join.builder.compileJoins();
    }
}