# wompy-image-upload

This project defines a Lambda function that accepts JSON via an API Gateway endpoint and writes it to an S3 bucket.

## Stack Resources

This project will setup the following infrastructure:

* An S3 bucket prefixed by `wompy-image-upload-bucket`
* Lambda function to connect to S3 and write to the bucket
* Permissions for the execution role to read, write, and list the bucket
* An HTTP API gateway to allow access from clients

If at any point you want to rebuild the infrastructure, you can delete the stack from Cloud Formation.

## Deploying

1. Install and configure the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. Run `aws configure` to configure the AWS environment
3. Install the [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)
4. Run `npm run deploy` to build and deploy the stack

## Testing

Right now there are no unit tests. After deploying, copy the URL from the "Outputs" section and run the following:

```bash
curl -X POST <URL FROM OUTPUT> \
-H "Content-Type: application/json" \ 
-d '{"filename": "hello.txt", "body": "Hey Jack, Joe here."}'
```

Example:

```
curl -X POST https://cik131xs98.execute-api.us-east-2.amazonaws.com/prod/upload \
  -H "Content-Type: application/json" \
  -d '{"filename": "hello.txt", "body": "Hey Jack, Joe here."}'

{"message":"Upload successful"}%   
```

You should see a successful response and data in the bucket.
