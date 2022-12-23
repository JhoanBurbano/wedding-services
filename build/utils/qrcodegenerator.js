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
exports.qrcodeGenerator = void 0;
const qrcode = require("qrcode");
const s3_1 = require("../s3");
const config_1 = require("../config");
function qrcodeGenerator(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const qr = yield qrcode.toDataURL(config_1.environment.CLIENT.WEB_APP_URL + id, {
                width: 400,
                color: {
                    dark: 'F3B562',
                    light: 'FFFFFF00'
                }
            });
            const name = `${id}.png`;
            const body = Buffer.from(qr.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            return yield (0, s3_1.uploadFile)({
                name,
                body
            });
        }
        catch (error) {
            console.log("error", error);
        }
    });
}
exports.qrcodeGenerator = qrcodeGenerator;
