const qrcode = require("qrcode");
import { uploadFile } from "../s3";
import { environment } from "../config";

export async function qrcodeGenerator(id: string) {
  try {
    console.log('environment.CLIENT.WEB_APP_URL', environment.CLIENT.WEB_APP_URL + id)
    const qr = await qrcode.toDataURL(environment.CLIENT.WEB_APP_URL as string + '#confirm?code=' + id, {
            width: 400,
            color: {
                dark: 'F3B562',
                light: 'FFFFFF00'
            }
    });
    const name = `${id}.png`;
    const body = Buffer.from(qr.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    return await uploadFile({
      name,
      body
    });
    
  } catch (error) {
    console.log("error", error);
  }
}