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
exports.updateInvite = exports.deleteInvites = exports.addInvites = exports.getInvite = exports.getInvites = void 0;
const invite_schema_1 = __importDefault(require("../models/invite.schema"));
const utils_1 = require("../utils");
const config_1 = require("../config");
function getInvites(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const invites = yield invite_schema_1.default.find();
            res.status(200).json([...invites]);
        }
        catch (error) {
            res.status(401).json({ error });
        }
    });
}
exports.getInvites = getInvites;
function getInvite(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const invite = yield invite_schema_1.default.findById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
            res.status(200).json(invite);
        }
        catch (error) {
            res.status(401).json({ error });
        }
    });
}
exports.getInvite = getInvite;
function addInvites(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const invite = new invite_schema_1.default(Object.assign({}, req.body));
            yield invite.save();
            const qr = yield (0, utils_1.qrcodeGenerator)(`${config_1.environment.CLIENT.WEB_APP_URL}${invite._id}`);
            console.log('qr', qr);
            res.json({ message: 'invite has been add succesfully', qr });
        }
        catch (error) {
            res.status(401).json({ error });
        }
    });
}
exports.addInvites = addInvites;
function deleteInvites(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield invite_schema_1.default.findByIdAndDelete(req.params.id);
            res.json({ message: 'invite has been deleted succesfully' });
        }
        catch (error) {
            res.status(401).json({ error });
        }
    });
}
exports.deleteInvites = deleteInvites;
function updateInvite(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const invite = yield invite_schema_1.default.findByIdAndUpdate(req.params.id, Object.assign({}, req.body));
            res.json({ message: 'invite has been updated succesfully', invite });
        }
        catch (error) {
            res.status(401).json({ error });
        }
    });
}
exports.updateInvite = updateInvite;
