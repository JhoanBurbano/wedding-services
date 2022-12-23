import { ObjectId, Schema, SchemaDefinitionProperty, Types, model } from 'mongoose';

interface IInvite {
    name: string,
    lastname: string,
    family: SchemaDefinitionProperty<ObjectId>
}

const invite_schema = new Schema<IInvite>({
    name: {type: String, required: true },
    lastname: {type: String, required: true},
    family: {type: Types.ObjectId, ref:'families', required: true}
}, { versionKey: false })


export default model('invite', invite_schema)