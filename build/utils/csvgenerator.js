"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvGenerator = void 0;
const fs_1 = __importDefault(require("fs"));
function csvGenerator(families) {
    const path = 'uploads/familiesList.csv';
    fs_1.default.writeFileSync(path, '', 'utf-8');
    const _families = JSON.parse(JSON.stringify(families));
    const fields = _families.map((family) => {
        return Object.assign(Object.assign({}, family), { _id: family._id.toString() });
    });
    const content = [['name', 'code', '@qrcode']];
    fields.forEach((family) => {
        content.push([family.family, family._id, `/Users/jhoansebastianburbano/Documents/freelance/design/datamerge/${family._id}.png`]);
    });
    content.forEach(row => fs_1.default.appendFileSync(path, row.join(',') + '\n'));
    const url = fs_1.default.readFileSync(path, { encoding: 'base64' });
    return { message: 'csv has been generated', url };
}
exports.csvGenerator = csvGenerator;
