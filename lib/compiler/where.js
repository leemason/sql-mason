var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {
    compileWheres: function(nested){

        if(this.getWheres().length === 0){
            return;
        }

        var statements = [];

        if(nested !== true) {
            statements.push('where');
        }

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
        return where.value;
    },

    compileWhereOperator: function(where){
        return e.escapeId(where.field) + ' ' + where.operator + ' ?';
    },

    compileWhereBetween: function(where){
        return e.escapeId(where.field) + ' between ? and ?';
    },

    compileWhereNotBetween: function(where){
        return e.escapeId(where.field) + ' not between ? and ?';
    },

    compileWhereIn: function(where){

        var bindings = [];

        where.value.forEach(function(){
            bindings.push('?');
        });

        return e.escapeId(where.field) + ' in ( ' + bindings.join(', ') + ' )';
    },

    compileWhereNotIn: function(where){

        var bindings = [];

        where.value.forEach(function(){
           bindings.push('?');
        });

        return e.escapeId(where.field) + ' not in ( ' + bindings.join(', ') + ' )';
    },

    compileWhereNull: function(where){
        return e.escapeId(where.field) + ' is null';
    },

    compileWhereNotNull: function(where){
        return e.escapeId(where.field) + ' is not null';
    },

    compileWhereBuilder: function(where){
        return '(' + where.builder.compileWheres(true) + ')';
    },

    compileWhereExists: function(where){
        return 'exists ( ' + where.builder.toSql().slice(0, -1) + ' )';
    },

    compileWhereNotExists: function(where){
        return 'not exists ( ' + where.builder.toSql().slice(0, -1) + ' )';
    }
}