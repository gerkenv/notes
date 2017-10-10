#### SQL

##### Theory
1. Database is a set of tables.
2. Each table has a name, this name is unique.
3. A table consist of columns, an each column has a unique name within the table.
4. SQL query is a string with semicolon at the end ';'.
5. Result of any query is presented by a table.

#### Playground
Lesson 2 :: Quiz 8 <br>
https://classroom.udacity.com/courses/ud197/lessons/3423258756/concepts/33885287060923


#### select
The query to get a complete table: <br>
select * from *table*;

Query in python presented as a string: <br>
QUERY = "select * from animals;"

##### where
Extract a data with a certain restriction (condition) on a _source_ tables <br>
where *restriction* <br>
select * from animals where species = 'llama'

##### min / max
get a minimal / maximal value from a column <br>
select min(*column*) from *table* <br>
QUERY = "select min(name) from animals;"

##### limit
limit *rows to return* [ offset *rows to skip* ] <br>
limit 10 offset 0 --> first ten rows of a result table <br>
limit 10 offset 5 --> ten rows of a result table - from 6th to 15th <br>
QUERY = "select * from animals limit 10;"

##### group
group by *columns* <br>
Change the behavior of aggregations such as max, count, and sum. <br>
With group by, the aggregation will return one row for each distinct value in columns. <br>
QUERY = "select species, min(birthdate) from animals group by species;"

##### count
counts a quantity of rows [ depending on a group / where clause ] <br>
count(*column*) [ as *name of new column* ] <br>
QUERY = "select count(species) from animals;"

##### having
Extract a data with a certain restriction (condition) on a _result_ tables (after aggregation) <br>
Requires: group modifier <br>
group by *column* having *restriction* <br>
QUERY = "select species, count(*) as number from animals group by species having number > 5;"

##### order
order by *column 0, column 1* [ desc ] <br>
order by species, name --> first result table is sorted by 'species' column in ascending order, then by 'name'. <br>
QUERY = "select * from animals where species = 'orangutan' order by birthdate;" <br>

#### insert
Used to add a values to database <br>
insert into *table* [ *( column1, column2, ... )* ] values *( val1, val2, ... )*; <br>
INSERT = "insert into animals (name,species,birthdate) values ('Luck','opossum','1970-01-01');"

#### join
select *columns of 2 tables* from *table 1* join *table 2* on *condition* <br>;
select A.column_0, B.column_0 from A join B on A.column_1 = B.column_1 <br>
or <br>
select *columns of 2 tables* from *tables* where *restriction* <br>
select A.column_0, B.column_0 from A, B where A.column_1 = B.column_1 <br>

select ordernames.name, count( * ) as num <br>
from (animals join taxonomy <br>
              on animals.species = taxonomy.name) <br>
              as ani_tax <br>
                  join ordernames <br>
                  on ani_tax.t_order = ordernames.t_order <br>
group by ordernames.name <br>
order by num desc <br>

or

select ordernames.name, count( * ) as num <br>
from animals, taxonomy, ordernames <br>
where animals.species = taxonomy.name <br>
and taxonomy.t_order = ordernames.t_order <br>
group by ordernames.name <br>
order by num desc

#### update / like
update *table* set *column* = *newValue* where *restriction* <br>;
update animals set name = 'new name of llama' where species = 'llama' <br>
update animals set name = 'new name of llama' where species like '%lam%' <br>
% - replaces any sequence of letters, like .* in regex

#### delete
delete from *table* where *restriction* <br>;
delete from animals where species = 'llama' <br>
__Hint__: it is better to check first, what are you going to delete <br>
select * from *table* where *restriction* 

#### create table
create table *name* ( <br>
    *column_0*  *type_0*, <br>
    *column_1*  *type_1*, <br>
    *column_n*  *type_n* <br>
); <br>
https://www.postgresql.org/docs/9.4/static/sql-createtable.html <br>
https://www.postgresql.org/docs/9.4/static/datatype.html

#### primary key
##### Single-column primary key
create table *name* ( <br>
    id serial primary key, <br>
    *column_1* *type_1*, <br>
    *column_n* *type_n* <br>
); <br>
A database will throw an error if a duplicate of existing primary key will be inserted into a primary key column.

##### Multi-column primary key
create table *name* ( <br>
    *column_0* *type_0*, <br>
    *column_1* *type_1*, <br>
    *column_n* *type_n*, <br>
    primary key ( *column_0*, *column_1* ) <-- the first two columns are primary keys <br>
);

#### relationships between tables
create table *name* ( <br>
    *column_0* *type_0* references *referenceTable*, <br>
    *column_1* *type_1*, <br>
    *column_n* *type_n* <br>
); <br>
Means that a *column_0* can have only the values of a *column_0* in a *referenceTable* <br>
Warning: the name *column_0* should be the same in a referenced table 
and an actual table which uses reference key ( __foreign key__ ) <br>

If the names are different between a tables, then the such kind of definition can be used: <br>
create table *name* ( <br>
    *column_0* *type_0* references *referenceTable*(*referenceColumn*), <br>
    *column_1* *type_1*, <br>
    *column_n* *type_n* <br>
); <br>

#### create database ( PostgreSQL )
create database *name* [options] <br>
then connect to database: <br>
\c *dbname* <br>
https://www.postgresql.org/docs/9.4/static/sql-createdatabase.html

#### drop database ( PostgreSQL )
drop database *name* [options] <br>
It is impossible to drop a database you're currently connected to. <br>
https://www.postgresql.org/docs/9.4/static/sql-dropdatabase.html

#### drop table
drop table *name* [options] <br>
https://www.postgresql.org/docs/9.4/static/sql-droptable.html <br>

#### subqueries
select avg(maxScore) from <br>
    ( select max(score) as maxScore <br>
    from mooseball <br>
    group by team ) <br>
    as maxTeamScores; <br>
https://www.postgresql.org/docs/9.4/static/sql-expressions.html#SQL-SYNTAX-SCALAR-SUBQUERIES <br>
https://www.postgresql.org/docs/9.4/static/functions-subquery.html <br>
https://www.postgresql.org/docs/9.4/static/sql-select.html#SQL-FROM <br>
