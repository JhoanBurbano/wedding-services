import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { environment, getAWSPATH } from "./config";

const client = new S3Client({
  region: environment.AWS.BUCKET_REGION,
  credentials: {
    accessKeyId: environment.AWS.PUBLIC_ACCESS_KEY as string,
    secretAccessKey: environment.AWS.SECRET_KEY as string,
  },
});

export async function uploadFile(file: any) {
  const uploadParams = {
    Bucket: environment.AWS.BUCKET,
    Key: `${environment.AWS.QR_PATH}${file.name}`,
    Body: file.body,
    ContentEncoding: "base64",
    ContentType: "image/png",
    ACL: "public-read",
  };
  const command = new PutObjectCommand(uploadParams);
  await client.send(command);
  return getAWSPATH(file.name);
}

export async function deleteFile(id: string) {
  const path = environment.AWS.QR_PATH + id + '.png'
  console.log('path', path)
  const command = new DeleteObjectCommand({
    Bucket: environment.AWS.BUCKET,
    Key: path
  })
  await client.send(command)
}