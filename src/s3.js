"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.uploadFile = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("./config");
const client = new client_s3_1.S3Client({
    region: config_1.environment.AWS.BUCKET_REGION,
    credentials: {
        accessKeyId: config_1.environment.AWS.PUBLIC_ACCESS_KEY,
        secretAccessKey: config_1.environment.AWS.SECRET_KEY,
    },
});
async function uploadFile(file) {
    const uploadParams = {
        Bucket: config_1.environment.AWS.BUCKET,
        Key: `${config_1.environment.AWS.QR_PATH}${file.name}`,
        Body: file.body,
        ContentEncoding: "base64",
        ContentType: "image/png",
        ACL: "public-read",
    };
    const command = new client_s3_1.PutObjectCommand(uploadParams);
    await client.send(command);
    return (0, config_1.getAWSPATH)(file.name);
}
exports.uploadFile = uploadFile;
async function deleteFile(id) {
    const path = config_1.environment.AWS.QR_PATH + id + '.png';
    console.log('path', path);
    const command = new client_s3_1.DeleteObjectCommand({
        Bucket: config_1.environment.AWS.BUCKET,
        Key: path
    });
    await client.send(command);
}
exports.deleteFile = deleteFile;
