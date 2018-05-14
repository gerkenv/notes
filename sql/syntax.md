## SQL

### Theory
1. Database is a set of tables.
2. Each table has a name, this name is unique.
3. A table consist of columns, an each column has a unique name within the table.
4. SQL query is a string with semicolon at the end ';'.
5. Result of any query is presented by a table.
6. [Comments](https://www.w3schools.com/sql/sql_comments.asp)

### Playground
Lesson 2 :: Quiz 8 <br>
https://classroom.udacity.com/courses/ud197/lessons/3423258756/concepts/33885287060923


### select
Reads a requested information from database.
Notation:
```sql
select columns from table
```
Example:
The query to get all columns from a `table`, i.e. get a whole `table`:
```sql
select * from table;
```
A query in python presented as a string:
```py
QUERY = "select * from animals;"
```

### modifiers
#### where
Extract all the data from a certain `table` which satisfies certain `restriction` (condition).
```sql
select * from table where restriction
select * from animals where species = 'llama'
```

#### min / max
Get a minimal / maximal value from a column <br>
```sql
select min(column) from table
```
Example:
```py
QUERY = "select min(name) from animals;"
```

#### limit
Show only first `amount` of results with an offset of `count`. \
Notation:
```sql
limit amount [ offset count ]
```
Examples:
* Return first 10 results of a query.
```sql
select * from animals limit 10 offset 0
```
* Return 10 results from __6th__ up to __15th__.
```sql
select * from animals limit 10 offset 5
```
```py
QUERY = "select * from animals limit 10;"
```

#### group
Group the result rows together by certain `column`.
Notation:
```sql
group by column
```
__Note__: Changes the behavior of aggregations such as `max`, `count`, `sum`, etc.
With group by, the aggregation will return one row for each distinct value in columns. \
Examples:
```py
QUERY = "select species, min(birthdate) from animals group by species;"
```

#### count
Counts a quantity of rows [ depending on a `group` / `where` clause ]. \
Notation:
```sql
count(column) [ as aliasOfColumn ]
```
Examples:
```py
QUERY = "select count(species) from animals;"
```

#### having
Extracts a data with a certain `restriction` (condition) from a `result` tables (after aggregation). \
__Requires__: `group` clause
Notation:
```sql
group by column having restriction
```
Examples:
```py
QUERY = "select species, count(*) as amount from animals group by species having amount > 5;"
```

#### order
Orders results of a query. At first a result table is sorted by `column_0` then by `column_1` and so on. \
If other not specified then column sorted in `asc`ending order. <br>
Notation:
```sql
order by column_0, column_1 [ asc, desc ]
```
Examples:
* Order by birthdate.
```py
QUERY = "select * from animals where species = 'orangutan' order by birthdate;" <br>
```

### insert
Used to add a values to database. \
Notation:
```sql
insert into table [ ( column1, column2, ... ) ] values ( val1, val2, ... );
```
__Note__: Each value : `val1`, `val2`, etc should match corresponding colunm. You can not provide 3 columns and 2 values. \
Examples:
```py
INSERT = "insert into animals (name,species,birthdate) values ('Luck','opossum','1970-01-01');"
```

### join
Combines `colums` of `table_a` with `columns` of `table_b` satisfying `condition`.
Notation:
```sql
select columns
from table_a join table_b
    on condition;
select table_a.column, table_b.column from table_a join table_b on condition;
```
Examples:
```sql
select table_a.column_0, table_b.column_0
from table_a join table_b
    on table_a.column_1 = table_b.column_1;
```
#### join through 'where' clause
Notation:
```sql
select columns
from tables
where restriction;
```
Examples:
```sql
select table_a.column_0, table_b.column_0
from table_a, table_b
where table_a.column_1 = table_b.column_1;

select ordernames.name, count( * ) as num
from (
    animals
    join taxonomy
    on animals.species = taxonomy.name
) as ani_tax
join ordernames
    on ani_tax.t_order = ordernames.t_order
group by ordernames.name
order by num desc

--or

select ordernames.name, count( * ) as num
from animals, taxonomy, ordernames
where animals.species = taxonomy.name
    and taxonomy.t_order = ordernames.t_order
group by ordernames.name
order by num desc
```

### update
Updates the recors of a `table` within a `column` if a `restriction` is satisfied.\
Notation:
```sql
update table set column = newValue where restriction;
```
Examples:
```sql
update animals set name = 'new name of llama' where species = 'llama';
```

#### like
With `like` modifier you're able yo use a specific `RegEx`, a bit different, but still it is something.
* `%` - replaces any sequence of letters, like `.*` in RegEx.
```sql
update animals set name = 'new name of llama' where species like '%lam%';
```

### delete
Notation:
```sql
delete from table where restriction;
```
Example:
```sql
delete from animals where species = 'llama';
```
__Hint__: it is better to check first, what are you going to delete, use following syntax for it:
```sql
select * from table where restriction;
```

### Subqueries
```sql
select avg(maxScore) from (
    select max(score) as maxScore
    from mooseball
    group by team
) as maxTeamScores;
```
Links:
* https://www.postgresql.org/docs/9.4/static/sql-expressions.html#SQL-SYNTAX-SCALAR-SUBQUERIES
* https://www.postgresql.org/docs/9.4/static/functions-subquery.html
* https://www.postgresql.org/docs/9.4/static/sql-select.html#SQL-FROM

```sql
select id, name, wins_, matches_
from (
    select id, name, count(idWinner) as matches_
    from players
    left join matches
        on (id = idWinner or id = idLoser)
    group by id
) as rounds
join (
    select id as id_, count(idWinner) as wins_
    from players
    left join matches
        on id = idWinner
    group by id
) as wins
on rounds.id = wins.
```


## PostgreSQL

### Create Table
```sql
create table name (
    column_0 type_0,
    column_1 type_1,
    column_n type_n
);
```
Links:
* https://www.postgresql.org/docs/9.4/static/sql-createtable.html <br>
* https://www.postgresql.org/docs/9.4/static/datatype.html

#### Primary key
##### Single-Column Primary Key
```sql
create table name (
    id serial primary key,
    column_1 type_1,
    column_n type_n
);
```
__Note__: A database will throw an error if a duplicate of existing primary key `id` will be inserted into a primary key `id` column.

##### Multi-column Primary Key
```sql
create table name (
    column_0 type_0,
    column_1 type_1,
    column_n type_n,
    primary key ( column_0, column_1 )
);
```
The `column_0` and `column_1` are primary keys of the `name` table.

#### Relationships Between Tables
```sql
create table name (
    column_0 type_0 references referenceTable,
    column_1 type_1,
    column_n type_n
);
```
Means that a `column_0` can have only the values of a `column_0` in a `referenceTable` <br>
__Warning__: the name `column_0` should be the same in a referenced table
and an actual table which uses reference key ( __foreign key__ ) <br>

If the names are different between a tables, then the such kind of definition can be used: <br>
```sql
create table name (
    column_0 type_0 references referenceTable(referenceColumn),
    column_1 type_1,
    column_n type_n
);
```

### Create Database
```
create database *name* [options] <br>
```
then connect to database: <br>
```
\c *dbname* <br>
```
Links:
* https://www.postgresql.org/docs/9.4/static/sql-createdatabase.html

### Drop Database
```
drop database *name* [options]
```
It is impossible to drop a database you're currently connected to. \
Links:
* https://www.postgresql.org/docs/9.4/static/sql-dropdatabase.html

### Drop Table
```
drop table *name* [options]
```
Links:
* https://www.postgresql.org/docs/9.4/static/sql-droptable.html


