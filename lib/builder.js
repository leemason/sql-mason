var _ = require('lodash');

var Builder = function(){
    this._builder = {};
};

Builder.prototype.createBuilder = function(){
    return new Builder();
}

_.assign(Builder.prototype, require('./builder/table'));
_.assign(Builder.prototype, require('./builder/select'));
_.assign(Builder.prototype, require('./builder/where'));

module.exports = Builder;