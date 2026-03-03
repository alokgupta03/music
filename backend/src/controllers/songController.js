import Song from "../models/Song.js";

export const addSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs" });
  }
};

export const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
  } catch {
    res.status(500).json({ message: "Error fetching song" });
  }
};

export const updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
  } catch {
    res.status(500).json({ message: "Error updating song" });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json({ message: "Song deleted successfully" });
  } catch {
    res.status(500).json({ message: "Error deleting song" });
  }
};
