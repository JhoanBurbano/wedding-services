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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSV = exports.updateFamily = exports.deleteFamilies = exports.getFamily = exports.getFamilies = exports.removeMember = exports.addMember = exports.createFamily = void 0;
const families_schema_1 = __importDefault(require("../models/families.schema"));
const invite_schema_1 = __importDefault(require("../models/invite.schema"));
const utils_1 = require("../utils");
const s3_1 = require("../s3");
function createFamily(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const family = new families_schema_1.default(Object.assign({}, req.body));
            family.qrcode = (yield (0, utils_1.qrcodeGenerator)(family._id.toString()));
            yield family.save();
            res.json({ message: 'family has been create' });
        }
        catch (error) {
            res.status(400).json({ error });
        }
    });
}
exports.createFamily = createFamily;
function addMember(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const invite = new invite_schema_1.default(Object.assign({}, req.body));
            yield invite.save();
            let family = yield families_schema_1.default.updateOne({ _id: req.params.familyId }, { $push: { integrants: invite._id }, $inc: { total: 1 } });
            res.json({ family });
        }
        catch (error) {
            res.status(400).json({ error });
        }
    });
}
exports.addMember = addMember;
function removeMember(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inviteId = yield invite_schema_1.default.findByIdAndDelete(req.params.inviteId);
            let family = yield families_schema_1.default.updateOne({ _id: req.params.familyId }, { $pull: { integrants: inviteId === null || inviteId === void 0 ? void 0 : inviteId._id }, $inc: { total: -1 } });
            res.json({ family });
        }
        catch (error) {
            res.status(400).json({ error });
        }
    });
}
exports.removeMember = removeMember;
function getFamilies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const families = yield families_schema_1.default.find().populate('integrants');
            res.json([...families]);
        }
        catch (error) {
            res.status(400).json({ error });
        }
    });
}
exports.getFamilies = getFamilies;
function getFamily(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const family = yield families_schema_1.default.findById(req.params.id).populate('integrants');
            res.json({ family });
        }
        catch (error) {
            res.status(400).json({ error });
        }
    });
}
exports.getFamily = getFamily;
function deleteFamilies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const family = yield families_schema_1.default.findByIdAndDelete(req.params.id);
            yield (0, s3_1.deleteFile)(req.params.id);
            console.log('req.params.familyId', family);
            res.json({ message: 'family has been deleted', family });
        }
        catch (error) {
            res.status(400).json({ error });
        }
    });
}
exports.deleteFamilies = deleteFamilies;
function updateFamily(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const family = yield families_schema_1.default.findByIdAndUpdate(req.params.id, Object.assign({}, req.body));
            res.json({ message: 'family has been deleted', family });
        }
        catch (error) {
            res.status(400).json({ error });
        }
    });
}
exports.updateFamily = updateFamily;
function generateCSV(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const families = yield families_schema_1.default.find({}, { integrants: 0, confirm: 0 });
            const fields = (0, utils_1.csvGenerator)(families);
            res.json(fields);
        }
        catch (error) {
            res.status(402).json({ error });
        }
    });
}
exports.generateCSV = generateCSV;
