module.exports = {

    isDistinct: function(){
        return this._builder.distinct || false;
    },

    getSelects: function(){
        if(this._builder.select.indexOf('*') !== -1){
            return ['*'];
        }else{
            return this._builder.select;
        }
    },

    select: function () {
        this._builder.method = 'Select';
        this._builder.select = Array.prototype.slice.call(arguments);
        return this;
    },

    distinct: function () {
        this._builder.method = 'Select';
        this._builder.distinct = true;
        return this;
    }
}