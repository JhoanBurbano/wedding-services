"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanBodyMiddleware = void 0;
const utils_1 = require("../utils");
function cleanBodyMiddleware(req, res, next) {
    req.body = (0, utils_1.fieldsToBD)(req.body);
    next();
}
exports.cleanBodyMiddleware = cleanBodyMiddleware;
