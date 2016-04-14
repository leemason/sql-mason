var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {
    compileGroupBy: function(){

        if(this.getGroupBy().length < 1){
            return;
        }

        var statements = [];

        this.getGroupBy().forEach(function(group){
            var statement = e.escapeId(group.column);
            if(group.order !== false){
                statement += ' ' + group.order;
            }

            statements.push(statement);
        });

        return 'group by ' + _.compact(statements).join(', ');
    }
}