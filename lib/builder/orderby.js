var _ = require('lodash');

module.exports = {

    orderBy: function () {

        this._builder.orderBy = this._builder.orderBy || [];

        if(_.isString(arguments[0])){
            this._builder.orderBy.push(
                {
                    column: arguments[0],
                    order: arguments[1] || 'asc'
                }
            );
        }

        return this;
    },

    getOrderBy: function(){
        return this._builder.orderBy || [];
    }
}