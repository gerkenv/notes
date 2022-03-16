# AWS

## CloudFormation Templates
- What is a CloudFormation https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html
- Template Basics https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/gettingstarted.templatebasics.html
- Template Anatomy https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html


### Intrinsic Functions
- `Sub` - https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html

## IAM

### IAM Policy Simulator
- https://policysim.aws.amazon.com/

Can be used to check whether your IAM policy allows you to access certain AWS API and resource.
- https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html

## Simple Queue Service (SQS)

### Basic Intro
- What is Amazon Simple Queue Service? https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
- Basic Amazon SQS architecture https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-basic-architecture.html

### Example Authentication Policy
- https://aws.amazon.com/premiumsupport/knowledge-center/sqs-accessdenied-errors/
- https://aws.amazon.com/premiumsupport/knowledge-center/sqs-queue-access-permissions/

### Javascript SDK

#### Getting the URL for a Queue
You can follow the API description of __v2__ to get an idea how to use it.
- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-using-queues.html

But actual implementation better to be in __v3__.
- https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sqs/index.html

### Node.js Considerations
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/node-js-considerations.html
