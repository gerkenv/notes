# NoSQL 101

## Source
Traversy Media - [An Introduction To NoSQL Databases](https://www.youtube.com/watch?v=uD3p_rZPBUQ)

## What is NoSQL?
* Not only SQL.
* A non-relational database.
* Flexible database used for big data & real-time web applications.
* There are several types of NoSQL databases.

## What is Big Data?
* A term for a data sets that are to large for traditional (relational) methods of storage & processing

## Advantages of NoSQL over RDBMS
* Handles Big Data
* No predefined schema for data model is required
* No need to structure your data in certain way
* Scaling - Scale Out / horizontal scaling, RDB using Scal Up / vertical scaling.

### Scale Vertically vs Scale Horizontally
* Scale vertically (up/down) means to add resources to (or remove resources from) a single node in a system, typically involving the addition of CPUs or memory to a single computer. Such vertical scaling of existing systems also enables them to use virtualization technology more effectively, as it provides more resources for the hosted set of operating system and application modules to share. Taking advantage of such resources can also be called "scaling up", such as expanding the number of Apache daemon processes currently running. Application scale ability is the improved performance of running applications on a scaled-up version of the system.
* Scale horizontally (scale out/in) means to add more nodes to (or remove nodes from) a system, such as adding a new computer to a distributed software application. An example might involve scaling out from one Web server system to three. As computer prices have dropped and performance continues to increase, high-performance computing applications such as seismic analysis and biotechnology workloads have adopted low-cost "commodity" systems for tasks that once would have required supercomputers. System architects may configure hundreds of small computers in a cluster to obtain aggregate computing power that often exceeds that of computers based on a single traditional processor. The development of high-performance interconnects such as Gigabit Ethernet, `InfiniBand` and `Myrinet` further fueled this model. Such growth has led to demand for software that allows efficient management and maintenance of multiple nodes, as well as hardware such as shared data storage with much higher I/O performance. Scale ability size is the maximum number of processors that a system can accommodate.

## Advantages of RDBMS over NoSQL
* Better for relational data (defined structure, defined relations, easier to understand)
* Normalization (redundancy elimination, takes less space)
* Well know languages (SQL)
* Data integrity (constraints)
* ACID Compliance ("All or nothing" : If one of several queries is failed, then initial  data is not changed)

## Types of NoSQL Databases
* Document Databases [MongoDB, CouchDB]
  * Completely without scheme, dynamic data structure.
* Column Databases [Apache Cassandraa]
  * Optimized for reading / writing data in columns instead of rows
  * reduces disk IO requirements
* Key-Value Stores [Redis, Couchbase Server]
  * For a simple data sets
  * Extremely fast
  * Not really customizable
  * Redis used to store cache
* Graph Databases [Neo4J]
  * Everything in graph database is stored as a node.
  * Nodes can have some relation through `edges`.
  * used for a social network where everything is related.

## Relational vs Document

| Col1 | Col2 | Col3 |
|------|------|------|
| data | data | data |
| data | data | data |

| Document 1 |
|------------|
```js
{
  "prop1":data,
  "prop2":data,
  "prop3":data,
}
```

| Document 2 |
|------------|
```js
{
  "prop1":data,
  "prop2":data,
  "prop3":data,
}
```

## More on Topic
* [Google I/O 2012 - SQL vs NoSQL: Battle of the Backends](https://www.youtube.com/watch?v=rRoy6I4gKWU)