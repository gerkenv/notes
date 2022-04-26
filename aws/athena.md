# Athena

## Intro
- [Basic AWS Athena Intro](https://www.youtube.com/watch?v=JIviltfpul0)
- https://aws.amazon.com/athena/getting-started/

### Accessing Athena
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

## Initial Setup
### From Docs
- https://docs.aws.amazon.com/athena/latest/ug/setting-up.html

## Capabilities
- https://docs.aws.amazon.com/athena/latest/ug/querying-athena-tables.html

## Athena SQL Reference
- https://docs.aws.amazon.com/athena/latest/ug/ddl-sql-reference.html

## Use Case. Run Query And Read Results

### Docs Intro
https://docs.aws.amazon.com/athena/latest/ug/querying.html

### From Reality
Check proper code examples:
- [java code sample](https://docs.aws.amazon.com/athena/latest/ug/code-samples.html#start-query-execution)
- [js code example](https://docs.aws.amazon.com/code-samples/latest/catalog/javascript-athena-index.js.html)

- Start a query with [StartQueryExecution](https://docs.aws.amazon.com/athena/latest/APIReference/API_StartQueryExecution.html)
- Continuosly check an execution state of the query - if it is finished, failed or running. Use [GetQueryExecution](https://docs.aws.amazon.com/athena/latest/APIReference/API_GetQueryExecution.html)
- After query is finished - read results with [GetQueryResults
](https://docs.aws.amazon.com/athena/latest/APIReference/API_GetQueryResults.html)

## Access Policy
### Basic Access Policy Templates
- [Example – Allow an IAM Principal to Run and Return Results Using Athena Federated Query](https://docs.aws.amazon.com/athena/latest/ug/federated-query-iam-access.html#fed-using-iam)

### Minimal Access Policy
```yaml
- PolicyName:  "example-iam-role-policy-for-athena"
  PolicyDocument:
    Version: '2012-10-17'
    Statement:
    - Sid: "1"
      Effect: Allow
      Action:
      - "athena:GetQueryResults"
      - "athena:StartQueryExecution"
      - "athena:GetWorkGroup"
      Resource:
      - !Sub "arn:aws:athena:*:${AWS::AccountId}:workgroup/*"
    - Sid: "1"
      Effect: Allow
      Action:
      - "s3:GetObject"
      - "s3:GetBucketLocation"
      Resource:
      ## if you don't specify any custom s3 bucket for query results, then default bucket is created 
      ## with arn `arn:aws:s3:::aws-athena-query-results-${AWS::Account}-${AWS::Region}`
      - "arn:aws:s3:::aws-athena-query-results-*"
```

### Troubleshooting
- [InvalidRequestException: Unable to verify/create output bucket](https://aws.amazon.com/premiumsupport/knowledge-center/athena-output-bucket-error/)
- [InvalidRequestException: Query has not yet finished. Current state: QUEUED](https://stackoverflow.com/questions/62767533/invalidrequestexception-when-calling-the-getqueryresults-querying-athena)

