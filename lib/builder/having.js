var _ = require('lodash');


module.exports = {


    getHavings: function(){
      return this._builder.having || [];
    },

    getHavingBindings: function(){

        this.havingInit();

        var bindings = [];

        this._builder.having.forEach(function(having){

            if (having.hasOwnProperty('bindings')){
                if(_.isArray(having.bindings)){
                    having.bindings.forEach(function(value){
                        bindings.push(value.toString());
                    });
                }
                return;
            } else if (having.hasOwnProperty('builder')){
                having.builder.getBindings().forEach(function(value){
                   bindings.push(value);
                });
                return;
            } else if(having.hasOwnProperty('value')){

                if(_.isArray(having.value)){
                    having.value.forEach(function(value){
                        bindings.push(value.toString());
                    });
                }else{
                    bindings.push(having.value.toString());
                }
                return;

            }
        });

        return bindings;
    },

    havingInit: function(){
        this._builder.having = this._builder.having || [];
    },

    havingRaw: function(condition, bindings, connector){

        this.havingInit();

        var having = {
            type: 'Raw',
            value: condition,
            connector: connector || 'and',
            bindings: bindings || []
        };

        this._builder.having.push(having);

        return this;
    },

    orhavingRaw: function(condition, bindings){

        return this.havingRaw(condition, bindings, 'or');

    },

    having: function(){

        this.havingInit();

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){
            var builder = this.createBuilder();
            args[0](builder);
            var having = {
                type: 'Builder',
                builder: builder,
                connector: (args.length == 2) ? args[1] : 'and'
            };
        }else{
            var having = {
                type: 'Operator',
                field: args[0],
                operator: (args.length == 2) ? '=' : args[1],
                value: (args.length == 2) ? args[1] : args[2],
                connector: (args.length == 4) ? args[3] : 'and'
            };
        }

        this._builder.having.push(having);


        return this;
    },

    orHaving: function(){

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){

            return this.having(args[0], 'or');

        }else{

            return this.having(
                args[0],
                (args.length == 2) ? '=' : args[1],
                (args.length == 2) ? args[1] : args[2],
                'or'
            );
        }
    }
}