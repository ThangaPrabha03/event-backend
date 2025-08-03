import express from "express";
import { registerEvent, getEvents } from "../controllers/eventRegisterController.js";

const router = express.Router();

router.post("/", registerEvent);
router.get("/", getEvents); 

export default router;
