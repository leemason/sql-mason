var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {
    compileUnions: function(mainquery){

        var statements = [];

        this.getUnions().forEach(function(union, index){
            statements.push(union.connector);
            var method = 'compileUnion' + union.type;

            statements.push(this[method](union));
        }.bind(this));

        return '(' + mainquery + ') ' + _.compact(statements).join(' ');
    },

    compileUnionRaw: function(union){
        return '(' + union.value + ')';
    },

    compileUnionBuilder: function(union){
        return '(' + union.builder.toSql().slice(0, -1) + ')';
    }
}