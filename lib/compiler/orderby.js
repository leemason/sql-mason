var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {
    compileOrderBy: function(){

        if(this.getOrderBy().length < 1){
            return;
        }

        var statements = [];

        this.getOrderBy().forEach(function(order){
            statements.push(e.escapeId(order.column) + ' ' + order.order);
        });

        return 'order by ' + _.compact(statements).join(', ');
    }
}