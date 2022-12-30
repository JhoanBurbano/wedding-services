"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsToBD = void 0;
function fieldsToBD(body) {
    for (let property in body) {
        if (typeof property === 'string') {
            let value = body[property];
            body[property] = value.trim().toLocaleLowerCase();
        }
    }
    return body;
}
exports.fieldsToBD = fieldsToBD;
