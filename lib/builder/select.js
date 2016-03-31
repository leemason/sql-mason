module.exports = {
    select: function () {
        this._builder.method = 'Select';
        this._builder.select = Array.prototype.slice.call(arguments);
        return this;
    }
}