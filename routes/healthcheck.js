import express from "express";
import { health } from "../controller/v1/healthcheck.js";

const router = express.Router();

router.get("/", health);

export default router;
