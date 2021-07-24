import express from "express";
import { getAll, create, getById } from "../controller/v1/users.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);

export default router;
