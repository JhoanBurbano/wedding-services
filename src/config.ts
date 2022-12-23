require('dotenv').config()

export const environment = {
    AWS: {
        BUCKET: process.env.AWS_BUCKET,
        BUCKET_REGION: process.env.AWS_BUCKET_REGION,
        PUBLIC_ACCESS_KEY: process.env.AWS_PUBLIC_ACCESS_KEY,
        SECRET_KEY: process.env.AWS_SECRET_KEY,
        QR_PATH: 'images/qr-codes/'
    },
    CLIENT:{
        WEB_APP_URL: process.env.CLIENT_WEB_APP_URL,
        VIEW_INVITE: process.env.CLIENT_STATUS_INVITE
    },
    MONGO: {
        USER: process.env.MONGO_USER,
        PASSWORD: process.env.MONGO_PASSWORD,
        DATABASE: process.env.MONGO_DATABASE,
    }
}

export function getAWSPATH(NAME:string){
    const {AWS:{BUCKET_REGION, BUCKET}, AWS:{QR_PATH}} = environment
    return `https://${BUCKET}.s3.${BUCKET_REGION}.amazonaws.com/${QR_PATH}${NAME}`

}