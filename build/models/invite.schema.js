"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const invite_schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    family: { type: mongoose_1.Types.ObjectId, ref: 'families', required: true }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)('invite', invite_schema);
