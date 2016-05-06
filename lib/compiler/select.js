var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {
    compileMethodSelect: function(){
        var statements = [];

        statements.push('select');

        statements.push(this.isDistinct() === true ? 'distinct' : '');

        statements.push(this.compileSelects());

        statements.push('from');

        statements.push(e.escapeId(this.getTable()));

        statements.push(this.compileJoins());

        statements.push(this.compileWheres());

        statements.push(this.compileGroupBy());

        statements.push(this.compileHavings());

        //if we have unions stop here, get the query and reset the statements, and perform magic wrapping
        if(this.getUnions().length > 0){
            var mainquery = _.compact(statements).join(' ');
            statements = [];
            statements.push(this.compileUnions(mainquery));
        }

        //orderby and limit at always at the end, including unions
        statements.push(this.compileOrderBy());

        statements.push(this.compileLimit());

        return _.compact(statements).join(' ') + ';';
    },

    compileSelects: function(){
        var statements = [];

        this.getSelects().forEach(function(column){
            statements.push(e.escapeId(column));
        });

        return _.compact(statements).join(', ');
    }
}