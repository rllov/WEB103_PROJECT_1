import express from "express";
import path from "path";
import { fileURLToPath } from "url";

//controller
import HeroController from "../controllers/heroes.js";

import heroesData from "../data/HeroesData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", HeroController.getAllHeroes);

router.get("/:heroId", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../public/Hero.html"));
});

export default router;
