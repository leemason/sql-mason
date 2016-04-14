var _ = require('lodash');

module.exports = {

    delete: function(){

        this._builder.method = 'Delete';

        return this;
    },

    getDeleteBindings: function(){

        return this.getWhereBindings();
    }
}