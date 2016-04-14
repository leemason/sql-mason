var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {
    compileMethodTruncate: function(){
        var statements = [];

        statements.push('truncate');

        statements.push(e.escapeId(this.getTable()));

        return _.compact(statements).join(' ') + ';';
    }
}