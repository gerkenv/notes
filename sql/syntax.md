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


#### Select Clauses:
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
Change the behavior of aggregations such as max, count, and sum. With group by, the aggregation will return one row for each distinct value in columns. <br>
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
insert into *table* [ *( column1, column2, ... )* ] values *( val1, val2, ... )* <br>
INSERT = "insert into animals (name,species,birthdate) values ('Luck','opossum','1970-01-01');"

#### join
select *columns of 2 tables* from *table 1* join *table 2* on *condition* <br>
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


