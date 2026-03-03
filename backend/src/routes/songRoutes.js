import express from "express";
import {
  addSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong
} from "../controllers/songController.js";

const router = express.Router();

router.post("/", addSong);
router.get("/", getAllSongs);
router.get("/:id", getSongById);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);

export default router;
