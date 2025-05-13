const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client({});
const BUCKET = process.env.BUCKET_NAME;

exports.handler = async (event) => {
  try {
    console.log("Received event:", JSON.stringify(event, null, 2));
    console.log('Bucket:', BUCKET);

    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    if (!body || !body.content || !body.filename) {
      throw new Error("Request must include `filename` and base64 `content`.");
    }

    const { filename, content } = body;
    const key = `images/${Date.now()}-${filename}`;

    const uploadParams = {
      Bucket: BUCKET,
      Key: key,
      Body: Buffer.from(content, 'base64'),
      ContentType: getContentType(filename),
    };

    await s3.send(new PutObjectCommand(uploadParams));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Image uploaded successfully',
        key: key
      }),
    };
  } catch (err) {
    console.error("Upload error:", err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: err.message }),
    };
  }
};

function getContentType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    default:
      return 'application/octet-stream';
  }
}
