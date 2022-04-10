# Athena

## Intro
- https://www.youtube.com/watch?v=JIviltfpul0&t=2884s

## Accessing Athena
Options:
- JDBC and ODBC drivers (synchronous)
- API (async)

## API (Asynchronous Query)
```js
client.startQueryExecution({
  QueryString: 'SELECT * FROM table LIMIT 100',
  ResultConfiguration: { OutputLocation: 's3://bucket/output' },
  EncryptionConfiguration: { Database: 'default_db' }
}, (err, result) => {})

client.getQueryResults({
  QueryExecutionId: 'id',
  MaxResults: 1000,
  NextToken: null
}, (err, data) => {})
```

