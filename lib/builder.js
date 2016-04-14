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
_.assign(Builder.prototype, require('./builder/orderby'));
_.assign(Builder.prototype, require('./builder/limit'));
_.assign(Builder.prototype, require('./builder/select'));
_.assign(Builder.prototype, require('./builder/where'));
_.assign(Builder.prototype, require('./builder/groupby'));
_.assign(Builder.prototype, require('./builder/having'));
_.assign(Builder.prototype, require('./builder/union'));
_.assign(Builder.prototype, require('./builder/insert'));
_.assign(Builder.prototype, require('./builder/update'));
_.assign(Builder.prototype, require('./builder/delete'));
_.assign(Builder.prototype, require('./builder/truncate'));

module.exports = Builder;