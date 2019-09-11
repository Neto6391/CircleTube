import express from "express";

import { index, post } from "../controllers/indexController";

const router = express.Router();

/* GET home page. */
router.post("/uploadFile", post);

export default router;
