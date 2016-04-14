var _ = require('lodash');

module.exports = {

    insert: function(data){

        this._builder.method = 'Insert';
        this._builder.insert = data;

        return this;
    },

    getInsertKeys: function(){
        if(_.isObject(this._builder.insert) && !_.isArray(this._builder.insert)){
            return Object.keys(this._builder.insert);
        }
        if(_.isArray(this._builder.insert) && this._builder.insert.length > 0){
            return Object.keys(this._builder.insert[0]);
        }
    },

    getInsertBindings: function(){
        var insertBindings = [];

        if(_.isObject(this._builder.insert)){
            insertBindings = _.values(this._builder.insert);
        }

        if(_.isArray(this._builder.insert) && this._builder.insert.length > 0){
            insertBindings = _.flatMap(this._builder.insert, function(insert){
                return _.values(insert);
            });
        }

        return insertBindings;
    }
}