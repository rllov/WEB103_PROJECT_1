import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import heroesData from "../data/HeroesData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", (req, res) => res.status(200).json(heroesData));

router.get("/:heroId", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../public/Hero.html"));
});

export default router;
