var _ = require('lodash');

var Escaper = function(){

};

Escaper.prototype.escapeId = function escapeId(val) {
    switch (typeof val) {
        case 'boolean': return val;
        case 'number': return val+'';
    }
    if(val == '*'){
        return val;
    }
    return '`' + val.replace(/`/g, '``').replace(/\./g, '`.`') + '`';
};

Escaper.prototype.escape = function escape(val) {
    if (val === undefined || val === null) {
        return 'NULL';
    }

    switch (typeof val) {
        case 'boolean': return (val) ? 'true' : 'false';
        case 'number': return val+'';
    }

    val = val.replace(/[\0\n\r\b\t\\\'\"\x1a]/g, function(s) {
        switch(s) {
            case "\0": return "\\0";
            case "\n": return "\\n";
            case "\r": return "\\r";
            case "\b": return "\\b";
            case "\t": return "\\t";
            case "\x1a": return "\\Z";
            default: return "\\"+s;
        }
    });

    return "'"+val+"'";
};

module.exports = Escaper;