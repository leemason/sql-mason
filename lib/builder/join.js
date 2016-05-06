var _ = require('lodash');


module.exports = {


    getJoins: function(){
      return this._builder.joins || [];
    },

    getJoinBindings: function(){

        this.joinInit();

        var bindings = [];

        this._builder.joins.forEach(function(join){

            if (join.hasOwnProperty('bindings')){
                if(_.isArray(join.bindings)){
                    join.bindings.forEach(function(value){
                        bindings.push(value.toString());
                    });
                }
                return;
            } else if (join.hasOwnProperty('builder')){
                join.builder.getBindings().forEach(function(value){
                   bindings.push(value);
                });
                return;
            }
        });

        return bindings;
    },

    joinInit: function(){
        this._builder.joins = this._builder.joins || [];
    },

    joinRaw: function(condition, bindings, connector){

        this.joinInit();

        var join = {
            type: 'Raw',
            value: condition,
            connector: connector || 'inner join',
            bindings: bindings || []
        };

        this._builder.joins.push(join);

        return this;
    },

    join: function(){

        this.joinInit();

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){
            var builder = this.createBuilder();
            args[0](builder);
            var join = {
                type: 'Builder',
                builder: builder,
                connector: (args.length == 2) ? args[1] : 'inner join'
            };

            this._builder.joins.push(join);
        }else if(args.length >= 3){
            var join = {
                type: 'Simple',
                table: args[0],
                key: args[1],
                value: args[2],
                connector: (args.length == 4) ? args[3] : 'inner join'
            };
            this._builder.joins.push(join);
        }

        return this;
    },

    outerJoin: function(){

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){
            args = [args[0], 'outer join'];
        } else {
            args = [args[0], args[1], args[2], 'outer join'];
        }

        return this.join.apply(this, args);
    },

    fullOuterJoin: function(){

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){
            args = [args[0], 'full outer join'];
        } else {
            args = [args[0], args[1], args[2], 'full outer join'];
        }

        return this.join.apply(this, args);
    },

    crossJoin: function(){

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){
            args = [args[0], 'cross join'];
        } else {
            args = [args[0], args[1], args[2], 'cross join'];
        }

        return this.join.apply(this, args);
    },

    leftJoin: function(){

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){
            args = [args[0], 'left join'];
        } else {
            args = [args[0], args[1], args[2], 'left join'];
        }

        return this.join.apply(this, args);
    },

    leftOuterJoin: function(){

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){
            args = [args[0], 'full outer join'];
        } else {
            args = [args[0], args[1], args[2], 'left outer join'];
        }

        return this.join.apply(this, args);
    },

    rightJoin: function(){

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){
            args = [args[0], 'right join'];
        } else {
            args = [args[0], args[1], args[2], 'right join'];
        }

        return this.join.apply(this, args);
    },

    rightOuterJoin: function(){

        var args = Array.prototype.slice.call(arguments);

        if(_.isFunction(args[0])){
            args = [args[0], 'right outer join'];
        } else {
            args = [args[0], args[1], args[2], 'right outer join'];
        }

        return this.join.apply(this, args);
    }
}