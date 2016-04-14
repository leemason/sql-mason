var _ = require('lodash'),
    Escaper = require('./../escaper'),
    e = new Escaper();

module.exports = {
    compileLimit: function(){

        if(this.getLimit().length < 1){
            return;
        }

        return 'limit ' + _.compact(this.getLimit()).join(', ');
    }
}