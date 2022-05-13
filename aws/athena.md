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
_semi-pseudo-code_
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

## Workgroups
- https://docs.aws.amazon.com/athena/latest/ug/workgroups-create-update-delete.html

## Athena SQL Reference
- https://docs.aws.amazon.com/athena/latest/ug/ddl-sql-reference.html

## Use Case. Run Query And Read Results

### Docs Intro
https://docs.aws.amazon.com/athena/latest/ug/querying.html

### From Reality
Check proper code examples:
- [java code sample](https://docs.aws.amazon.com/athena/latest/ug/code-samples.html#start-query-execution)
- [js code example](https://docs.aws.amazon.com/code-samples/latest/catalog/javascript-athena-index.js.html)
- https://www.ilkkapeltola.fi/2018/04/simple-way-to-query-amazon-athena-in.html 

Required Code Flow:
- Start a query with [StartQueryExecution](https://docs.aws.amazon.com/athena/latest/APIReference/API_StartQueryExecution.html)
- Continuosly check an execution state of the query - if it is finished, failed or running. Use [GetQueryExecution](https://docs.aws.amazon.com/athena/latest/APIReference/API_GetQueryExecution.html)
- After query is finished - read results with [GetQueryResults
](https://docs.aws.amazon.com/athena/latest/APIReference/API_GetQueryResults.html)

#### JS/TS SDK
- https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-athena/index.html

#### Base Functions
- https://docs.aws.amazon.com/athena/latest/APIReference/API_StartQueryExecution.html
- https://docs.aws.amazon.com/athena/latest/APIReference/API_GetQueryExecution.html
- https://docs.aws.amazon.com/athena/latest/APIReference/API_GetQueryResults.html


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

### Example Of Complete Access Policy
```yaml
PolicyDocument:
  Version: '2012-10-17'
  Statement:
  - Sid: "0"
    Effect: Allow
    Action:
    - "athena:GetQueryResults"
    - "athena:StartQueryExecution"
    - "athena:GetWorkGroup"
    - "athena:GetQueryExecution"
    Resource:
    - !Sub "arn:aws:athena:*:${AWS::AccountId}:workgroup/*"
  - Sid: "1"
    Effect: Allow
    Action:
    - "s3:GetBucketLocation"
    - "s3:GetObject"
    - "s3:ListBucket"
    - "s3:ListBucketMultipartUploads"
    - "s3:ListMultipartUploadParts"
    - "s3:AbortMultipartUpload"
    - "s3:CreateBucket"
    - "s3:PutObject"
    Resource:
    # s3 to store athena query results
    - "{{S3_TO_STORE_ATHENA_QUERY_RESULTS}}"
  - Sid: "2"
    Effect: Allow
    Action:
    - "s3:GetObject"
    - "s3:GetBucketLocation"
    - "s3:ListBucket"
    Resource:
    # s3 of the table to query from
    - "{{S3_OF_TABLE_TO_QUERY_FROM}}"
    - "{{S3_OF_TABLE_TO_QUERY_FROM}}/*"
  - Sid: "3"
    Effect: Allow
    Action:
    - "glue:GetTable"
    - "glue:GetPartition"
    - "glue:GetPartitions"
    - "glue:GetDatabase"
    - "glue:GetDatabases"
    Resource:
    - !Sub "arn:aws:glue:*:${AWS::AccountId}:catalog"
    - !Sub "arn:aws:glue:*:${AWS::AccountId}:database/default"
    - !Sub "arn:aws:glue:*:${AWS::AccountId}:table/default/{{ATHENA_TABLE_NAME}}"
```

### Troubleshooting
- [The policy failed legacy parsing]
  - https://stackoverflow.com/questions/43045029/the-policy-failed-legacy-parsing 
- [InvalidRequestException: Unable to verify/create output bucket](https://aws.amazon.com/premiumsupport/knowledge-center/athena-output-bucket-error/)
- [InvalidRequestException: Query has not yet finished. Current state: QUEUED](https://stackoverflow.com/questions/62767533/invalidrequestexception-when-calling-the-getqueryresults-querying-athena)
- [The S3 location provided to save your query results is invalid. Please check your S3 location is correct and is in the same region and try again](https://aws.amazon.com/premiumsupport/knowledge-center/athena-invalid-s3-location-error/)
- [Why do I get the "Access Denied" error when I run a query in Amazon Athena?](https://aws.amazon.com/premiumsupport/knowledge-center/access-denied-athena/)
- [An error occurred (InvalidRequestException) when calling the GetQueryResults operation: Query did not finish successfully. Final query state: FAILED](https://stackoverflow.com/questions/62767533/invalidrequestexception-when-calling-the-getqueryresults-querying-athena)
- [How do I troubleshoot 403 Access Denied errors from Amazon S3](https://aws.amazon.com/premiumsupport/knowledge-center/s3-troubleshoot-403/)
