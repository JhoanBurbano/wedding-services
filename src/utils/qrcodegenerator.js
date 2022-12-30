"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrcodeGenerator = void 0;
const qrcode = require("qrcode");
const s3_1 = require("../s3");
const config_1 = require("../config");
async function qrcodeGenerator(id) {
    try {
        console.log('environment.CLIENT.WEB_APP_URL', config_1.environment.CLIENT.WEB_APP_URL + id);
        const qr = await qrcode.toDataURL(config_1.environment.CLIENT.WEB_APP_URL + '#confirm?code=' + id, {
            width: 400,
            color: {
                dark: 'F3B562',
                light: 'FFFFFF00'
            }
        });
        const name = `${id}.png`;
        const body = Buffer.from(qr.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        return await (0, s3_1.uploadFile)({
            name,
            body
        });
    }
    catch (error) {
        console.log("error", error);
    }
}
exports.qrcodeGenerator = qrcodeGenerator;
