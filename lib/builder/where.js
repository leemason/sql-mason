var _ = require('lodash');


module.exports = {


    getWheres: function(){
      return this._builder.where || [];
    },

    getWhereBindings: function(){

        this.whereInit();

        var bindings = [];

        this._builder.where.forEach(function(where){

            if (where.hasOwnProperty('bindings')){
                if(_.isArray(where.bindings)){
                    where.bindings.forEach(function(value){
                        bindings.push(value.toString());
                    });
                }
                return;
            } else if (where.hasOwnProperty('builder')){
                where.builder.getBindings().forEach(function(value){
                   bindings.push(value);
                });
                return;
            } else if(where.hasOwnProperty('value')){

                if(_.isArray(where.value)){
                    where.value.forEach(function(value){
                        bindings.push(value.toString());
                    });
                }else{
                    bindings.push(where.value.toString());
                }
                return;

            }
        });

        return bindings;
    },

    whereInit: function(){
        this._builder.where = this._builder.where || [];
    },

    whereRaw: function(condition, bindings, connector){

        this.whereInit();

        var where = {
            type: 'Raw',
            value: condition,
            connector: connector || 'and',
            bindings: bindings || []
        };

        this._builder.where.push(where);

        return this;
    },

    orWhereRaw: function(condition, bindings){

        return this.whereRaw(condition, bindings, 'or');

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
    },

    whereBetween: function(field, value, connector){

        this.whereInit();

        var where = {
            type: 'Between',
            field: field,
            value: value,
            connector: connector || 'and'
        };

        this._builder.where.push(where);


        return this;
    },

    orWhereBetween: function(field, value){

        return this.whereBetween(field, value, 'or');
    },

    whereNotBetween: function(field, value, connector){

        this.whereInit();

        var where = {
            type: 'NotBetween',
            field: field,
            value: value,
            connector: connector || 'and'
        };

        this._builder.where.push(where);


        return this;
    },

    orWhereNotBetween: function(field, value){

        return this.whereNotBetween(field, value, 'or');
    },

    whereIn: function(field, value, connector){

        this.whereInit();

        var where = {
            type: 'In',
            field: field,
            value: value,
            connector: connector || 'and'
        };

        this._builder.where.push(where);

        return this;
    },

    orWhereIn: function(field, value){

        return this.whereIn(field, value, 'or');
    },

    whereNotIn: function(field, value, connector){

        this.whereInit();

        var where = {
            type: 'NotIn',
            field: field,
            value: value,
            connector: connector || 'and'
        };

        this._builder.where.push(where);

        return this;
    },

    orWhereNotIn: function(field, value){

        return this.whereNotIn(field, value, 'or');
    },

    whereNull: function(field, connector){

        this.whereInit();

        var where = {
            type: 'Null',
            field: field,
            connector: connector || 'and'
        };

        this._builder.where.push(where);

        return this;
    },

    orWhereNull: function(field){

        return this.whereNull(field, 'or');
    },

    whereNotNull: function(field, connector){

        this.whereInit();

        var where = {
            type: 'NotNull',
            field: field,
            connector: connector || 'and'
        };

        this._builder.where.push(where);

        return this;
    },

    orWhereNotNull: function(field){

        return this.whereNotNull(field, 'or');
    },

    whereExists: function(callback, connector){

        this.whereInit();

        var builder = this.createBuilder();

        callback(builder);
        var where = {
            type: 'Exists',
            builder: builder,
            connector: connector || 'and'
        };

        this._builder.where.push(where);


        return this;
    },

    orWhereExists: function(callback){

        return this.whereExists(callback, 'or');
    }


}