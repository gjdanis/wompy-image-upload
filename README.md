# wompy-image-upload

This project defines two AWS Lambda functions behind an API gateway that allow a user to upload and fetch images. The images are ultimately saved in an S3 bucket.

## Stack Resources

The code will setup the following infrastructure:

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

Right now there are no unit tests but you can open the `demo.html` file and test uploading and fetching an image from the bucket.
