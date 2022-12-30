"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSV = exports.updateFamily = exports.deleteFamilies = exports.getFamily = exports.getFamilies = exports.removeMember = exports.addMember = exports.createFamily = void 0;
const families_schema_1 = __importDefault(require("../models/families.schema"));
const invite_schema_1 = __importDefault(require("../models/invite.schema"));
const utils_1 = require("../utils");
const s3_1 = require("../s3");
async function createFamily(req, res) {
    try {
        const family = new families_schema_1.default({ ...req.body });
        if (family.family.length) {
            family.qrcode = await (0, utils_1.qrcodeGenerator)(family._id.toString());
        }
        await family.save();
        res.json({ message: 'family has been create' });
    }
    catch (error) {
        res.status(400).json({ error });
    }
}
exports.createFamily = createFamily;
async function addMember(req, res) {
    try {
        const invite = new invite_schema_1.default({ ...req.body });
        await invite.save();
        let family = await families_schema_1.default.updateOne({ _id: req.params.familyId }, { $push: { integrants: invite._id }, $inc: { total: 1 } });
        res.json({ family });
    }
    catch (error) {
        res.status(400).json({ error });
    }
}
exports.addMember = addMember;
async function removeMember(req, res) {
    try {
        const inviteId = await invite_schema_1.default.findByIdAndDelete(req.params.inviteId);
        let family = await families_schema_1.default.updateOne({ _id: req.params.familyId }, { $pull: { integrants: inviteId?._id }, $inc: { total: -1 } });
        res.json({ family });
    }
    catch (error) {
        res.status(400).json({ error });
    }
}
exports.removeMember = removeMember;
async function getFamilies(req, res) {
    try {
        const families = await families_schema_1.default.find().populate('integrants');
        res.json([...families]);
    }
    catch (error) {
        res.status(400).json({ error });
    }
}
exports.getFamilies = getFamilies;
async function getFamily(req, res) {
    try {
        const family = await families_schema_1.default.findById(req.params.id).populate('integrants');
        res.json({ family });
    }
    catch (error) {
        res.status(400).json({ error });
    }
}
exports.getFamily = getFamily;
async function deleteFamilies(req, res) {
    try {
        const family = await families_schema_1.default.findByIdAndDelete(req.params.id);
        await (0, s3_1.deleteFile)(req.params.id);
        console.log('req.params.familyId', family);
        res.json({ message: 'family has been deleted', family });
    }
    catch (error) {
        res.status(400).json({ error });
    }
}
exports.deleteFamilies = deleteFamilies;
async function updateFamily(req, res) {
    try {
        const family = await families_schema_1.default.findByIdAndUpdate(req.params.id, { ...req.body });
        res.json({ message: 'family has been deleted', family });
    }
    catch (error) {
        res.status(400).json({ error });
    }
}
exports.updateFamily = updateFamily;
async function generateCSV(req, res) {
    try {
        const families = await families_schema_1.default.find({}, { integrants: 0, confirm: 0 });
        const fields = (0, utils_1.csvGenerator)(families);
        res.json(fields);
    }
    catch (error) {
        res.status(402).json({ error });
    }
}
exports.generateCSV = generateCSV;
