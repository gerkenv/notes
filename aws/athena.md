# Athena

## Intro
- [Basic AWS Athena Intro](https://www.youtube.com/watch?v=JIviltfpul0)
- https://aws.amazon.com/athena/getting-started/

## Accessing Athena
Options:
- JDBC and ODBC drivers (synchronous)
- API (async)

### API (Asynchronous Query)
From [Basic AWS Athena Intro](https://www.youtube.com/watch?v=JIviltfpul0)

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

## More Exact Required API
From reality.
Check [proper java code sample](https://docs.aws.amazon.com/athena/latest/ug/code-samples.html#start-query-execution).

- Start a query with [StartQueryExecution](https://docs.aws.amazon.com/athena/latest/APIReference/API_StartQueryExecution.html)
- Continuosly check an execution state of the query - if it is finished, failed or running. Use [GetQueryExecution](https://docs.aws.amazon.com/athena/latest/APIReference/API_GetQueryExecution.html)
- After query is finished - read results with [GetQueryResults
](https://docs.aws.amazon.com/athena/latest/APIReference/API_GetQueryResults.html)

## Access Policy
### Basic Access Policy Templates
- [Example – Allow an IAM Principal to Run and Return Results Using Athena Federated Query](https://docs.aws.amazon.com/athena/latest/ug/federated-query-iam-access.html#fed-using-iam)

### Troubleshooting
- [How do I resolve the "Unable to verify/create output bucket" error in Amazon Athena?](https://aws.amazon.com/premiumsupport/knowledge-center/athena-output-bucket-error/)

