import { ObjectId, Schema, Types, model } from 'mongoose';
import { SchemaDefinitionProperty } from 'mongoose';

interface IFamily {
    family: string,
    total: number,
    confirm: boolean,
    qrcode: string,
    integrants: Array<SchemaDefinitionProperty<ObjectId>>
}

const family_schema = new Schema<IFamily>({
    family: {type: String, required: true, unique:true },
    total: {type: Number, required: false, default: 0},
    confirm: {type: Boolean, require: false, default: false},
    integrants: [{type: Types.ObjectId, ref: 'invite'}],
    qrcode: {type: String, required:true}
}, { versionKey: false })


export default model('families', family_schema)