"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const family_schema = new mongoose_1.Schema({
    family: { type: String, required: true, unique: true },
    total: { type: Number, required: false, default: 0 },
    confirm: { type: Boolean, require: false, default: false },
    integrants: [{ type: mongoose_1.Types.ObjectId, ref: 'invite' }],
    qrcode: { type: String, required: true }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)('families', family_schema);
