var _ = require('lodash'),
    raw = require('./builder/raw');

var Builder = function(){
    this._builder = {
        method: 'Select'
    };
};

Builder.prototype.createBuilder = function(){
    return new this.constructor();
}

Builder.prototype.raw = function(string, bindings){
    return new raw(string, bindings);
}

Builder.prototype.getBindings = function(){

    var bindings = 'get' + this._builder.method + 'Bindings';

    return this[bindings]();
}

_.assign(Builder.prototype, require('./builder/table'));
_.assign(Builder.prototype, require('./builder/select'));
_.assign(Builder.prototype, require('./builder/where'));

module.exports = Builder;