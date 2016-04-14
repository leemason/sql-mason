var _ = require('lodash');

module.exports = {

    truncate: function(){

        this._builder.method = 'Truncate';

        return this;
    },

    getTruncateBindings: function(){

        return [];
    }
}