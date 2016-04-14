var expect = require("chai").expect,
    Mason = require("../lib/compiler");

describe("Compiler", function() {

    beforeEach(function () {
        var mason = new Mason();
    });

    describe("#select", function () {

        it("should compile a simple select query", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users');

            expect(sql.toSql()).to.equal('select * from `users`;');

        });

        it("should compile a simple select query with multiple fields", function () {

            var mason = new Mason();

            sql = mason
                .select('first_name', 'last_name', 'email')
                .from('users');

            expect(sql.toSql()).to.equal('select `first_name`, `last_name`, `email` from `users`;');

        });

    });

    describe("#distinct", function () {

        it("should compile a simple distinct query", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .distinct()
                .from('users');

            expect(sql.toSql()).to.equal('select distinct * from `users`;');

        });

    });

    describe("#whereRaw", function () {

        it("should compile a simple select query with a whereRaw clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereRaw('`first_name` = ?', ['lee']);

            expect(sql.toSql()).to.equal('select * from `users` where `first_name` = ?;');

        });

    });

    describe("#where", function () {

        it("should compile a simple select query with a where clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee');

            expect(sql.toSql()).to.equal('select * from `users` where `first_name` = ?;');

        });

        it("should compile a simple select query with a where operator clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', '>=', 'lee');

            expect(sql.toSql()).to.equal('select * from `users` where `first_name` >= ?;');

        });

        it("should compile a simple select query with a nested where clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where(function(builder){
                    builder
                        .where('first_name', 'lee')
                        .where('last_name', 'mason');
                });

            expect(sql.toSql()).to.equal('select * from `users` where (`first_name` = ? and `last_name` = ?);');

        });

    });

    describe("#whereBetween", function () {

        it("should compile a simple select query with a where between clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereBetween('first_name', ['lee', 'david']);

            expect(sql.toSql()).to.equal('select * from `users` where `first_name` between ? and ?;');

        });

    });

    describe("#whereNotBetween", function () {

        it("should compile a simple select query with a where not between clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereNotBetween('first_name', ['lee', 'david']);

            expect(sql.toSql()).to.equal('select * from `users` where `first_name` not between ? and ?;');

        });

    });

    describe("#whereIn", function () {

        it("should compile a simple select query with a where in clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereIn('first_name', ['lee', 'david']);

            expect(sql.toSql()).to.equal('select * from `users` where `first_name` in ( ?, ? );');

        });

    });

    describe("#whereNotIn", function () {

        it("should compile a simple select query with a where not in clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereNotIn('first_name', ['lee', 'david']);

            expect(sql.toSql()).to.equal('select * from `users` where `first_name` not in ( ?, ? );');

        });

    });

    describe("#whereNull", function () {

        it("should compile a simple select query with a where null clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereNull('first_name');

            expect(sql.toSql()).to.equal('select * from `users` where `first_name` is null;');

        });

    });

    describe("#whereNotNull", function () {

        it("should compile a simple select query with a where not null clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereNotNull('first_name');

            expect(sql.toSql()).to.equal('select * from `users` where `first_name` is not null;');

        });

    });

    describe("#whereExists", function () {

        it("should compile a simple select query with a where exists sub query clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereExists(function(sub){
                    sub
                        .select('*')
                        .from('admins')
                        .whereRaw('users.id = admins.user_id');
                });

            expect(sql.toSql()).to.equal('select * from `users` where exists ( select * from `admins` where users.id = admins.user_id );');

        });

    });

    describe("#whereNotExists", function () {

        it("should compile a simple select query with a where not exists sub query clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereNotExists(function(sub){
                    sub
                        .select('*')
                        .from('admins')
                        .whereRaw('users.id = admins.user_id');
                });

            expect(sql.toSql()).to.equal('select * from `users` where not exists ( select * from `admins` where users.id = admins.user_id );');

        });

    });
    
    describe("#orWhere**", function () {

        it("should compile a simple select query with where conditions joined by 'or'", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .orWhere('first_name', 'david');

            expect(sql.toSql()).to.equal('select * from `users` where `first_name` = ? or `first_name` = ?;');

        });

    });
});