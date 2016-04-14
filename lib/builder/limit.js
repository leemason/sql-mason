var _ = require('lodash');

module.exports = {

    limit: function (start, end) {

        this._builder.limit = [];

        if(_.isNumber(start)){
            this._builder.limit.push(start);
        }

        if(_.isNumber(end)){
            this._builder.limit.push(end);
        }

        return this;
    },

    getLimit: function(){
        return this._builder.limit || [];
    }
}