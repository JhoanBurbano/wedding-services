"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvite = exports.deleteInvites = exports.addInvites = exports.getInvite = exports.getInvites = void 0;
const invite_schema_1 = __importDefault(require("../models/invite.schema"));
const utils_1 = require("../utils");
const config_1 = require("../config");
async function getInvites(req, res) {
    try {
        const invites = await invite_schema_1.default.find();
        res.status(200).json([...invites]);
    }
    catch (error) {
        res.status(401).json({ error });
    }
}
exports.getInvites = getInvites;
async function getInvite(req, res) {
    try {
        const invite = await invite_schema_1.default.findById(req.params?.id);
        res.status(200).json(invite);
    }
    catch (error) {
        res.status(401).json({ error });
    }
}
exports.getInvite = getInvite;
async function addInvites(req, res) {
    try {
        const invite = new invite_schema_1.default({ ...req.body });
        await invite.save();
        const qr = await (0, utils_1.qrcodeGenerator)(`${config_1.environment.CLIENT.WEB_APP_URL}${invite._id}`);
        console.log('qr', qr);
        res.json({ message: 'invite has been add succesfully', qr });
    }
    catch (error) {
        res.status(401).json({ error });
    }
}
exports.addInvites = addInvites;
async function deleteInvites(req, res) {
    try {
        await invite_schema_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'invite has been deleted succesfully' });
    }
    catch (error) {
        res.status(401).json({ error });
    }
}
exports.deleteInvites = deleteInvites;
async function updateInvite(req, res) {
    try {
        const invite = await invite_schema_1.default.findByIdAndUpdate(req.params.id, { ...req.body });
        res.json({ message: 'invite has been updated succesfully', invite });
    }
    catch (error) {
        res.status(401).json({ error });
    }
}
exports.updateInvite = updateInvite;
