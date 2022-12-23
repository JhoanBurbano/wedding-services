"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router_families = void 0;
const express_1 = require("express");
const index_1 = require("../controllers/index");
exports.router_families = (0, express_1.Router)();
exports.router_families.get("/families", index_1.getFamilies);
exports.router_families.get("/families/csv", index_1.generateCSV);
exports.router_families.get("/families/:id", index_1.getFamily);
exports.router_families.post("/families", index_1.createFamily);
exports.router_families.put("/families/:id", index_1.updateFamily);
exports.router_families.delete("/families/:id", index_1.deleteFamilies);
exports.router_families.post("/:familyId/add", index_1.addMember);
exports.router_families.delete("/:familyId/:inviteId", index_1.removeMember);