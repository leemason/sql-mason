var expect = require("chai").expect,
    Builder = require("../lib/builder"),
    builder;

describe("Builder", function() {

    beforeEach(function () {
        builder = new Builder();
    });

    describe("#root", function () {
        var sql = new Builder()
            //.table('users')
            //.select('*')
            .where('first_name', '=', 'lee')
            .where(function(w){
                w
                    .where('last_name', 'mason')
                    .where('active', true);
            })
            .orWhere('first_name', '=', 'lee')
            .orWhere(function(w){
                w
                    .where('last_name', 'mason')
                    .where('active', true);
            })
            .whereRaw('something = something')
            .orWhereRaw('something = something')
            //.toSql();

        //console.log(sql._builder.where[1][0]());

        console.log(JSON.stringify(sql, null, 4));

        //expect(sql).to.equal('select * from users where first_name = `lee`;');
    });
});