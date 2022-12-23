"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function uploadFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const uploadParams = {
            Bucket: config_1.environment.AWS.BUCKET,
            Key: `${config_1.environment.AWS.QR_PATH}${file.name}`,
            Body: file.body,
            ContentEncoding: "base64",
            ContentType: "image/png",
            ACL: "public-read",
        };
        const command = new client_s3_1.PutObjectCommand(uploadParams);
        yield client.send(command);
        return (0, config_1.getAWSPATH)(file.name);
    });
}
exports.uploadFile = uploadFile;
function deleteFile(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = config_1.environment.AWS.QR_PATH + id + '.png';
        console.log('path', path);
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: config_1.environment.AWS.BUCKET,
            Key: path
        });
        yield client.send(command);
    });
}
exports.deleteFile = deleteFile;
