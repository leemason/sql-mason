var _ = require('lodash');


module.exports = {

    whereInit: function(){
        this._builder.where = this._builder.where || [];
    },

    whereRaw: function(condition, bindings, connector){

        this.whereInit();

        var where = {
            type: 'Raw',
            value: condition,
            connector: connector || 'and'
        };

        this._builder.where.push(where);

        /*
        if(bindings !== undefined){
            bindings.forEach(function(binding){
                this._bindings.push(binding);
            }.bind(this));
        }
        */

        return this;
    },

    where: function(){
        this.whereInit();

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){
            var builder = this.createBuilder();
            args[0](builder);
            var where = {
                type: 'Builder',
                builder: builder,
                connector: (args.length == 2) ? args[1] : 'and'
            };
        }else{
            var where = {
                type: 'Operator',
                field: args[0],
                operator: (args.length == 2) ? '=' : args[1],
                value: (args.length == 2) ? args[1] : args[2],
                connector: (args.length == 4) ? args[3] : 'and'
            };
        }

        this._builder.where.push(where);


        return this;
    },

    orWhereRaw: function(condition, bindings){

        return this.whereRaw(condition, bindings, 'or');

    },

    orWhere: function(){

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){

            return this.where(args[0], 'or');

        }else{

            return this.where(
                args[0],
                (args.length == 2) ? '=' : args[1],
                (args.length == 2) ? args[1] : args[2],
                'or'
            );
        }
    }
}