module.exports = {
    table: function(table){
        this._builder.table = table;
        return this;
    },
    from: function(table){
        return this.table(table);
    }
}