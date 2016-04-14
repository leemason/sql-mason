var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {
    compileHavings: function(nested){

        if(this.getHavings().length === 0){
            return;
        }

        var statements = [];

        if(nested !== true) {
            statements.push('having');
        }

        this.getHavings().forEach(function(having, index){
            if(index !== 0){
                statements.push(having.connector);
            }
            var method = 'compileHaving' + having.type;

            statements.push(this[method](having));
        }.bind(this));

        return _.compact(statements).join(' ');
    },

    compileHavingRaw: function(having){
        return having.value;
    },

    compileHavingOperator: function(having){
        return e.escapeId(having.field) + ' ' + having.operator + ' ?';
    },

    compileHavingBuilder: function(having){
        return '(' + having.builder.compileHavings(true) + ')';
    }
}