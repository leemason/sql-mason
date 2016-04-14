var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {
    compileMethodDelete: function(){
        var statements = [];

        statements.push('delete');

        statements.push('from');

        statements.push(e.escapeId(this.getTable()));

        statements.push(this.compileWheres());

        statements.push(this.compileOrderBy());

        statements.push(this.compileLimit());

        return _.compact(statements).join(' ') + ';';
    }
}