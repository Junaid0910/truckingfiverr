import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';

export function getS3Client() {
  return new S3Client({ region: process.env.S3_REGION, credentials: { accessKeyId: process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY } });
}

export async function getSignedUploadUrl(key, contentType='application/octet-stream') {
  const client = getS3Client();
  const cmd = new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key, ContentType: contentType });
  const url = await getSignedUrl(client, cmd, { expiresIn: 3600 });
  return url;
}

// Upload a buffer or stream directly to S3. Returns the S3 key and public URL-ish path (not presigned).
export async function uploadFile(bufferOrStream, key, contentType='application/octet-stream') {
  const client = getS3Client();
  const cmd = new PutObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key, Body: bufferOrStream, ContentType: contentType });
  await client.send(cmd);
  // We return the key; consumers can construct the URL based on their bucket policy or use signed urls to access.
  return { key, path: `/s3/${key}` };
}

export async function getSignedDownloadUrl(key, expiresIn = 3600) {
  const client = getS3Client();
  const cmd = new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key });
  const url = await getSignedUrl(client, cmd, { expiresIn });
  return url;
}
