var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {
    compileMethodUpdate: function(){
        var statements = [];

        statements.push('update');

        statements.push(e.escapeId(this.getTable()));

        statements.push('set');

        statements.push(this.compileUpdates());

        statements.push(this.compileWheres());

        statements.push(this.compileOrderBy());

        statements.push(this.compileLimit());

        return _.compact(statements).join(' ') + ';';
    },

    compileUpdates: function(){
        var statements = [];

        for(var key in this._builder.update){
            statements.push(e.escapeId(key) + ' = ?');
        }

        return _.compact(statements).join(', ');
    }
}