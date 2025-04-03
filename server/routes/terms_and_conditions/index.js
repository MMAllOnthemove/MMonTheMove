import express from "express";
import { limiter } from "../../middleware/rateLimiter.js";
import { authenticateToken } from "../../middleware/verify.js";


import AddAssemblyTerms from "../../controllers/terms_and_conditions/assembly_disassembly/add.js";
import deleteAssemblyTerm from "../../controllers/terms_and_conditions/assembly_disassembly/delete.js";
import GetAssemblyTerms from "../../controllers/terms_and_conditions/assembly_disassembly/get.js";
import { UpdateAssemblyTerm } from "../../controllers/terms_and_conditions/assembly_disassembly/update.js";

const router = express.Router();
router.get("/", authenticateToken, GetAssemblyTerms);
router.post("/", limiter, authenticateToken, AddAssemblyTerms);
router.put("/:id", authenticateToken, UpdateAssemblyTerm);
router.delete("/:id", authenticateToken, deleteAssemblyTerm);

export { router };

