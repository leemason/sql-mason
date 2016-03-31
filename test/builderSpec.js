var expect = require("chai").expect,
    Mason = require("../index");

describe("Builder", function() {

    beforeEach(function () {
        var mason = new Mason();
    });

    describe("#select", function () {

        it("should compile a simple select query", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .toSql();

            expect(sql).to.equal('select * from `users`;');

        });

        it("should compile a simple select query with multiple fields", function () {

            var mason = new Mason();

            sql = mason
                .select('first_name', 'last_name', 'email')
                .from('users')
                .toSql();

            expect(sql).to.equal('select `first_name`, `last_name`, `email` from `users`;');

        });

    });

    describe("#distinct", function () {

        it("should compile a simple distinct query", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .distinct()
                .from('users')
                .toSql();

            expect(sql).to.equal('select distinct * from `users`;');

        });

    });

    describe("#where", function () {

        it("should compile a simple select query with a where clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .where('last_name', '=', 'mason')
                .toSql();

            expect(sql).to.equal('select * from `users` where `first_name` = ? and `last_name` = ?;');

        });

    });

    /*

    describe("#root", function () {

        var builder = new Builder();
        var b = builder.createBuilder();

        var sql = b
            .table('users')
            .select('*')
            .where('first_name', 'lee')
            .where('first_name', '!=', 'lee')
            .where(function(w){
                w
                    .where('last_name', 'mason')
                    .where('active', true);
            })
            .orWhere('first_name', 'lee')
            .orWhere('first_name', '!=', 'lee')
            .orWhere(function(w){
                w
                    .where('last_name', 'mason')
                    .where('active', true);
            })
            .whereRaw('something = something', ['something'])
            .orWhereRaw('something = something')
            .whereBetween('amount', [1,100])
            .orWhereBetween('amount', [1,100])
            .whereNotBetween('amount', [1,100])
            .orWhereNotBetween('amount', [1,100])
            .whereIn('amount', [1,100])
            .orWhereIn('amount', [1,100])
            .whereNotIn('amount', [1,100])
            .orWhereNotIn('amount', [1,100])
            .whereNull('amount')
            .orWhereNull('amount')
            .whereNotNull('amount')
            .orWhereNotNull('amount')
            .whereExists(function(w){
                w
                    .select('*')
                    .from('table')
                    .where('last_name', 'mason');
            })
            .orWhereExists(function(w){
                w
                    .select('*')
                    .from('table')
                    .where('last_name', 'mason');
            })
            .toSql();

        console.log(sql);

        //console.log(JSON.stringify(sql.getWhereBindings(), null, 4));

        //console.log(JSON.stringify(sql, null, 4));

        //expect(sql).to.equal('select * from users where first_name = `lee`;');
    });

    */
});