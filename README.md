# SQL Mason

[![Travis](https://img.shields.io/travis/leemason/sql-mason.svg?maxAge=2592000)](https://github.com/leemason/sql-mason)

A Node JS SQL Query Builder.

Inspired by Laravel and Knex this is a decoupled SQL builder ONLY!

No db connection, no config, just a builder. It currently supports MySQL dialects with plans for other MySQL engines in the future.

In early early alpha stage this builder has been designed to be readable, simple, and convert method calls into SQL statements.

The package contains 3 main classes, the Builder, the Compiler (extends the builder), and a simple escaper class.

You should not use te Builder class directly, always use the Compiler class which has the ```toSql()``` method plus all the inherited methods from the builder.

To keep it simple just require the package root and you will get an instance ready for usage:

```
var Mason = require('sql-mason');

var builder = new Mason();

var query = builder.table('users').where('id', 1);

var sql = query.toSql(); //=> select * from `users` where `id` = ?;

var bindings = query.getBindings(); //=> [1]
```

Please see the test cases for method usage, full documentation will take place before stable launch.
