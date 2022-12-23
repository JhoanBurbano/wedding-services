import { Router } from "express";
import {
  createFamily,
  getFamilies,
  getFamily,
  deleteFamilies,
  updateFamily,
  addMember,
  removeMember,
  generateCSV
} from "../controllers/index";

export const router_families = Router();

router_families.get("/families", getFamilies);
router_families.get("/families/csv", generateCSV);
router_families.get("/families/:id", getFamily);
router_families.post("/families", createFamily);
router_families.put("/families/:id", updateFamily);
router_families.delete("/families/:id", deleteFamilies);
router_families.post("/:familyId/add", addMember);
router_families.delete("/:familyId/:inviteId", removeMember);
