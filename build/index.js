"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes/");
require("./config");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
const port = 3001;
exports.root = __dirname;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
require('./db');
app.get('/', (req, res) => {
    res.send('App running correctly');
});
app.use('/', routes_1.router);
app.use('/', middleware_1.cleanBodyMiddleware, routes_1.router_families);
app.use(express_1.default.static('uploads'));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
