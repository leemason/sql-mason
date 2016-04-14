var _ = require('lodash');


module.exports = {


    getUnions: function(){
      return this._builder.union || [];
    },

    getUnionBindings: function(){

        this.unionInit();

        var bindings = [];

        this._builder.union.forEach(function(union){

            if (union.hasOwnProperty('bindings')){
                if(_.isArray(union.bindings)){
                    union.bindings.forEach(function(value){
                        bindings.push(value.toString());
                    });
                }
                return;
            } else if (union.hasOwnProperty('builder')){
                union.builder.getBindings().forEach(function(value){
                   bindings.push(value);
                });
                return;
            }
        });

        return bindings;
    },

    unionInit: function(){
        this._builder.union = this._builder.union || [];
    },

    unionRaw: function(condition, bindings, connector){

        this.unionInit();

        var union = {
            type: 'Raw',
            value: condition,
            connector: connector || 'union',
            bindings: bindings || []
        };

        this._builder.union.push(union);

        return this;
    },

    unionAllRaw: function(condition, bindings){

        return this.unionRaw(condition, bindings, 'union all');

    },

    unionDistinctRaw: function(condition, bindings){

        return this.unionRaw(condition, bindings, 'union distinct');

    },

    union: function(){

        this.unionInit();

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){
            var builder = this.createBuilder();
            args[0](builder);
            var union = {
                type: 'Builder',
                builder: builder,
                connector: (args.length == 2) ? args[1] : 'union'
            };

            this._builder.union.push(union);
        }

        return this;
    },

    unionAll: function(cb){

        return this.union(cb, 'union all');
    },

    unionDistinct: function(cb){

        return this.union(cb, 'union distinct');
    }
}