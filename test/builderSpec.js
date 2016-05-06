var expect = require("chai").expect,
    Mason = require("../lib/builder");

describe("Builder", function() {

    beforeEach(function () {
        var mason = new Mason();
    });

    describe("#select", function () {

        it("should compile a simple select query", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users');

            expect(sql._builder.method).to.equal('Select');

            expect(sql.getSelects()).to.eql(['*']);

        });

        it("should compile a simple select query with multiple fields", function () {

            var mason = new Mason();

            sql = mason
                .select('first_name', 'last_name', 'email')
                .from('users');

            expect(sql.getSelects()).to.eql(['first_name', 'last_name', 'email']);

        });

    });

    describe("#distinct", function () {

        it("should compile a simple distinct query", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .distinct()
                .from('users');

            expect(sql.isDistinct()).to.equal(true);

        });

    });

    describe("#whereRaw", function () {

        it("should compile a simple select query with a whereRaw clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereRaw('`first_name` = ?', ['lee']);

            expect(sql.getBindings()).to.eql(['lee']);

        });

    });

    describe("#where", function () {

        it("should compile a simple select query with a where clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee');

            expect(sql.getBindings()).to.eql(['lee']);

        });

        it("should compile a simple select query with a where operator clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', '>=', 'lee');

            expect(sql.getBindings()).to.eql(['lee']);

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

            expect(sql.getBindings()).to.eql(['lee', 'mason']);

        });

    });

    describe("#whereBetween", function () {

        it("should compile a simple select query with a where between clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereBetween('first_name', ['lee', 'david']);

            expect(sql.getBindings()).to.eql(['lee', 'david']);

        });

    });

    describe("#whereNotBetween", function () {

        it("should compile a simple select query with a where not between clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereNotBetween('first_name', ['lee', 'david']);

            expect(sql.getBindings()).to.eql(['lee', 'david']);

        });

    });

    describe("#whereIn", function () {

        it("should compile a simple select query with a where in clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereIn('first_name', ['lee', 'david']);

            expect(sql.getBindings()).to.eql(['lee', 'david']);

        });

    });

    describe("#whereNotIn", function () {

        it("should compile a simple select query with a where not in clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereNotIn('first_name', ['lee', 'david']);

            expect(sql.getBindings()).to.eql(['lee', 'david']);

        });

    });

    describe("#whereNull", function () {

        it("should compile a simple select query with a where null clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereNull('first_name');

            expect(sql.getBindings()).to.eql([]);

        });

    });

    describe("#whereNotNull", function () {

        it("should compile a simple select query with a where not null clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .whereNotNull('first_name');

            expect(sql.getBindings()).to.eql([]);

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

            expect(sql.getBindings()).to.eql([]);

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

            expect(sql.getBindings()).to.eql([]);

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

            expect(sql.getBindings()).to.eql(['lee', 'david']);

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

            expect(sql.getBindings()).to.eql(['lee', 'mason']);
            expect(sql.getInsertKeys()).to.eql(['first_name', 'last_name']);

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

            expect(sql.getBindings()).to.eql(['lee', 'mason', 'david', 'mason']);
            expect(sql.getInsertKeys()).to.eql(['first_name', 'last_name']);

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

            expect(sql.getBindings()).to.eql(['lee', 'mason', '1']);

        });

    });

    describe("#delete", function () {

        it("should compile a simple delete query with a where clauses", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .where('id', 1)
                .delete();

            expect(sql.getBindings()).to.eql(['1']);

        });

    });

    describe("#truncate", function () {

        it("should compile a simple truncate query", function () {

            var mason = new Mason();

            sql = mason
                .table('users')
                .truncate();

            expect(sql._builder.method).to.equal('Truncate');

            expect(sql.getBindings()).to.eql([]);

        });

    });

    describe("#orderBy", function () {

        it("should compile add order by parameters", function () {

            var mason = new Mason();

            sql = mason
                .orderBy('key');

            expect(sql._builder.orderBy).to.eql([{column: 'key', order: 'asc'}]);

            sql.orderBy('newkey', 'desc');

            expect(sql._builder.orderBy).to.eql([{column: 'key', order: 'asc'}, {column: 'newkey', order: 'desc'}]);
        });

    });

    describe("#limit", function () {

        it("should compile add limit parameters", function () {

            var mason = new Mason();

            sql = mason
                .limit(1);

            expect(sql._builder.limit).to.eql([1]);

            sql.limit(1, 10);

            expect(sql._builder.limit).to.eql([1, 10]);
        });

    });

    describe("#groupBy", function () {

        it("should compile add group by parameters", function () {

            var mason = new Mason();

            sql = mason
                .groupBy('key');

            expect(sql._builder.groupBy).to.eql([{column: 'key', order: false}]);

            sql.groupBy('newkey', 'desc');

            expect(sql._builder.groupBy).to.eql([{column: 'key', order: false}, {column: 'newkey', order: 'desc'}]);
        });

    });


    describe("#havingRaw", function () {

        it("should compile a simple select query with a havingRaw clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .havingRaw('`first_name` = ?', ['lee']);

            expect(sql.getBindings()).to.eql(['lee']);

        });

    });

    describe("#having", function () {

        it("should compile a simple select query with a having clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .having('first_name', 'lee');

            expect(sql.getBindings()).to.eql(['lee']);

        });

        it("should compile a simple select query with a having operator clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .having('first_name', '>=', 'lee');

            expect(sql.getBindings()).to.eql(['lee']);

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

            expect(sql.getBindings()).to.eql(['lee', 'mason']);

        });

    });

    describe("#union", function () {

        it("should compile a simple select query with a union clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .union(function(builder){
                    builder
                        .table('test')
                        .where('something', true)
                })
                .limit(1, 10);

            expect(sql.getBindings()).to.eql(['lee', 'true']);

        });

    });

    describe("#joinRaw", function () {

        it("should compile a simple select query with a join raw clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .joinRaw('"accounts" on "accounts"."id" = "users"."account_id"');

            expect(sql.getJoins()[0].value).to.equal('"accounts" on "accounts"."id" = "users"."account_id"');

        });

    });

    describe("#join", function () {

        it("should compile a simple select query with a join clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .join("accounts", "accounts.id", "users.account_id");

            expect(sql.getJoins()[0].table).to.equal("accounts");
            expect(sql.getJoins()[0].key).to.equal("accounts.id");
            expect(sql.getJoins()[0].value).to.equal("users.account_id");
            expect(sql.getJoins()[0].connector).to.equal("inner join");

        });

    });

    describe("#outerJoin", function () {

        it("should compile a simple select query with a outer join clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .outerJoin("accounts", "accounts.id", "users.account_id");

            expect(sql.getJoins()[0].table).to.equal("accounts");
            expect(sql.getJoins()[0].key).to.equal("accounts.id");
            expect(sql.getJoins()[0].value).to.equal("users.account_id");
            expect(sql.getJoins()[0].connector).to.equal("outer join");

        });

    });

    describe("#fullOuterJoin", function () {

        it("should compile a simple select query with a full outer join clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .fullOuterJoin("accounts", "accounts.id", "users.account_id");

            expect(sql.getJoins()[0].connector).to.equal("full outer join");

        });

    });

    describe("#crossJoin", function () {

        it("should compile a simple select query with a cross join clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .crossJoin("accounts", "accounts.id", "users.account_id");

            expect(sql.getJoins()[0].connector).to.equal("cross join");

        });

    });

    describe("#leftJoin", function () {

        it("should compile a simple select query with a left join clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .leftJoin("accounts", "accounts.id", "users.account_id");

            expect(sql.getJoins()[0].connector).to.equal("left join");

        });

    });

    describe("#leftOuterJoin", function () {

        it("should compile a simple select query with a left outer join clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .leftOuterJoin("accounts", "accounts.id", "users.account_id");

            expect(sql.getJoins()[0].connector).to.equal("left outer join");

        });

    });


    describe("#rightJoin", function () {

        it("should compile a simple select query with a right join clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .rightJoin("accounts", "accounts.id", "users.account_id");

            expect(sql.getJoins()[0].connector).to.equal("right join");

        });

    });

    describe("#rightOuterJoin", function () {

        it("should compile a simple select query with a right outer join clause", function () {

            var mason = new Mason();

            sql = mason
                .select('*')
                .from('users')
                .where('first_name', 'lee')
                .rightOuterJoin("accounts", "accounts.id", "users.account_id");

            expect(sql.getJoins()[0].connector).to.equal("right outer join");

        });

    });

});