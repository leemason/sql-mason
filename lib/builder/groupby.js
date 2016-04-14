var _ = require('lodash');

module.exports = {

    groupBy: function () {

        this._builder.groupBy = this._builder.groupBy || [];

        if(_.isString(arguments[0])){
            this._builder.groupBy.push(
                {
                    column: arguments[0],
                    order: arguments[1] || false
                }
            );
        }

        return this;
    },

    getGroupBy: function(){
        return this._builder.groupBy || [];
    }
}