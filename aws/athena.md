# Athena

## Intro
- https://www.youtube.com/watch?v=JIviltfpul0
- https://aws.amazon.com/athena/getting-started/

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

## Access Policy
### Basic Access Policy Templates
- [Example – Allow an IAM Principal to Run and Return Results Using Athena Federated Query](https://docs.aws.amazon.com/athena/latest/ug/federated-query-iam-access.html#fed-using-iam)

### Troubleshooting
- [How do I resolve the "Unable to verify/create output bucket" error in Amazon Athena?](https://aws.amazon.com/premiumsupport/knowledge-center/athena-output-bucket-error/)

