var _ = require('lodash');


module.exports = function rawObj(string, bindings){
    this.string = string;
    this.bindings = bindings || [];

    function toString(){
        return this.string;
    }

    function getBindings(){
        return this.bindings;
    }

    return this;
}