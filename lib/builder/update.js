var _ = require('lodash');

module.exports = {

    update: function(data){

        this._builder.method = 'Update';
        this._builder.update = data;

        return this;
    },

    getUpdateBindings: function(){
        var updateBindings = [];

        if(_.isObject(this._builder.update)){
            updateBindings = _.values(this._builder.update);
        }

        return updateBindings.concat(this.getWhereBindings());
    }
}