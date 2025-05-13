const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  try {
    console.log("Received event:", JSON.stringify(event, null, 2));

    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    if (!body) {
      throw new Error("No JSON body received.");
    }

    console.log('Bucket:', process.env.BUCKET_NAME);

    const filename = `upload-${Date.now()}.json`;

    await s3.putObject({
      Bucket: process.env.BUCKET_NAME,
      Key: `uploads/${filename}`,
      Body: JSON.stringify(body),
      ContentType: 'application/json',
    }).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Upload successful' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
