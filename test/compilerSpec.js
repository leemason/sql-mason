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

    describe("#insert", function () {

        it("should compile a simple insert query with a json object", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .insert({
                    first_name: 'lee',
                    last_name: 'mason'
                });

            expect(sql.toSql()).to.equal('insert into `users` (`first_name`, `last_name`) values (?, ?);');

        });

        it("should compile a simple insert query with an array of json object", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .insert([
                    {
                        first_name: 'lee',
                        last_name: 'mason'
                    },
                    {
                        first_name: 'david',
                        last_name: 'mason'
                    }
                ]);

            expect(sql.toSql()).to.equal('insert into `users` (`first_name`, `last_name`) values (?, ?), (?, ?);');

        });

    });

    describe("#update", function () {

        it("should compile a simple update query with a json object and where clauses", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .where('id', 1)
                .update({
                    first_name: 'lee',
                    last_name: 'mason'
                });

            expect(sql.toSql()).to.equal('update `users` set `first_name` = ?, `last_name` = ? where `id` = ?;');

        });

    });

    describe("#delete", function () {

        it("should compile a simple delete query with a where clauses", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .where('id', 1)
                .delete();

            expect(sql.toSql()).to.equal('delete from `users` where `id` = ?;');

        });

    });

    describe("#truncate", function () {

        it("should compile a simple truncate query", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .truncate();

            expect(sql.toSql()).to.equal('truncate `users`;');

        });

    });

    describe("#orderBy", function () {

        it("should compile a simple select query with a order by clause", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .select('*')
                .where('active', true)
                .orderBy('first_name');

            expect(sql.toSql()).to.equal('select * from `users` where `active` = ? order by `first_name` asc;');

            mason = new Mason();

            sql = mason
                .table('users')
                .select('*')
                .where('active', true)
                .orderBy('first_name', 'desc');

            expect(sql.toSql()).to.equal('select * from `users` where `active` = ? order by `first_name` desc;');

            mason = new Mason();

            sql = mason
                .table('users')
                .select('*')
                .where('active', true)
                .orderBy('first_name', 'desc')
                .orderBy('last_name', 'asc');

            expect(sql.toSql()).to.equal('select * from `users` where `active` = ? order by `first_name` desc, `last_name` asc;');

        });

        it("should compile a simple update query with a order by clause", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .update({
                    active: true
                })
                .where('active', true)
                .orderBy('first_name');

            expect(sql.toSql()).to.equal('update `users` set `active` = ? where `active` = ? order by `first_name` asc;');

            mason = new Mason();

            sql = mason
                .table('users')
                .update({
                    active: true
                })
                .where('active', true)
                .orderBy('first_name', 'desc');

            expect(sql.toSql()).to.equal('update `users` set `active` = ? where `active` = ? order by `first_name` desc;');

            mason = new Mason();

            sql = mason
                .table('users')
                .update({
                    active: true
                })
                .where('active', true)
                .orderBy('first_name', 'desc')
                .orderBy('last_name', 'asc');

            expect(sql.toSql()).to.equal('update `users` set `active` = ? where `active` = ? order by `first_name` desc, `last_name` asc;');

        });

        it("should compile a simple delete query with a order by clause", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .orderBy('first_name')
                .delete();

            expect(sql.toSql()).to.equal('delete from `users` order by `first_name` asc;');

            mason = new Mason();

            sql = mason
                .table('users')
                .orderBy('first_name', 'desc')
                .delete();

            expect(sql.toSql()).to.equal('delete from `users` order by `first_name` desc;');

            mason = new Mason();

            sql = mason
                .table('users')
                .orderBy('first_name', 'desc')
                .orderBy('last_name', 'asc')
                .delete();

            expect(sql.toSql()).to.equal('delete from `users` order by `first_name` desc, `last_name` asc;');

        });

    });


    describe("#limit", function () {

        it("should compile a simple select query with a limit clause", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .select('*')
                .where('active', true)
                .limit(10);

            expect(sql.toSql()).to.equal('select * from `users` where `active` = ? limit 10;');

            mason = new Mason();

            sql = mason
                .table('users')
                .select('*')
                .where('active', true)
                .limit(10, 100);

            expect(sql.toSql()).to.equal('select * from `users` where `active` = ? limit 10, 100;');

        });

        it("should compile a simple update query with a limit clause", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .update({
                    active: true
                })
                .where('active', true)
                .limit(10);

            expect(sql.toSql()).to.equal('update `users` set `active` = ? where `active` = ? limit 10;');

            mason = new Mason();

            sql = mason
                .table('users')
                .update({
                    active: true
                })
                .where('active', true)
                .limit(10, 100);

            expect(sql.toSql()).to.equal('update `users` set `active` = ? where `active` = ? limit 10, 100;');

        });

        it("should compile a simple delete query with a limit clause", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .limit(10)
                .delete();

            expect(sql.toSql()).to.equal('delete from `users` limit 10;');

            mason = new Mason();

            sql = mason
                .table('users')
                .limit(10, 100)
                .delete();

            expect(sql.toSql()).to.equal('delete from `users` limit 10, 100;');

        });

    });

    describe("#groupBy", function () {

        it("should compile a simple select query with a group by clause", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .select('*')
                .where('active', true)
                .groupBy('first_name');

            expect(sql.toSql()).to.equal('select * from `users` where `active` = ? group by `first_name`;');

            mason = new Mason();

            sql = mason
                .table('users')
                .select('*')
                .where('active', true)
                .groupBy('first_name', 'desc');

            expect(sql.toSql()).to.equal('select * from `users` where `active` = ? group by `first_name` desc;');

            mason = new Mason();

            sql = mason
                .table('users')
                .select('*')
                .where('active', true)
                .groupBy('first_name')
                .groupBy('last_name');

            expect(sql.toSql()).to.equal('select * from `users` where `active` = ? group by `first_name`, `last_name`;');

        });

    });

    describe("#havingRaw", function () {

        it("should compile a simple select query with a havingRaw clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .havingRaw('`first_name` = ?', ['lee']);

            expect(sql.toSql()).to.equal('select * from `users` having `first_name` = ?;');

        });

    });

    describe("#having", function () {

        it("should compile a simple select query with a having clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .having('first_name', 'lee');

            expect(sql.toSql()).to.equal('select * from `users` having `first_name` = ?;');

        });

        it("should compile a simple select query with a having operator clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .having('first_name', '>=', 'lee');

            expect(sql.toSql()).to.equal('select * from `users` having `first_name` >= ?;');

        });

        it("should compile a simple select query with a nested having clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .having(function(builder){
                    builder
                        .having('first_name', 'lee')
                        .having('last_name', 'mason');
                });

            expect(sql.toSql()).to.equal('select * from `users` having (`first_name` = ? and `last_name` = ?);');

        });

    });

    describe("#union", function () {

        it("should compile a simple select query with union clauses", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .union(function(builder){
                    builder
                        .table('test')
                        .select('*')
                        .where('active', 'true')
                })
                .unionAll(function(builder){
                    builder
                        .table('test2')
                        .select('*')
                        .where('active', 'true')
                })
                .unionDistinct(function(builder){
                    builder
                        .table('test3')
                        .select('*')
                        .where('active', 'true')
                })
                .unionRaw('select * from custom')
                .orderBy('first_name');

            expect(sql.toSql()).to.equal('(select * from `users` where `first_name` = ?) union (select * from `test` where `active` = ?) union all (select * from `test2` where `active` = ?) union distinct (select * from `test3` where `active` = ?) union (select * from custom) order by `first_name` asc;');

        });

    });
});