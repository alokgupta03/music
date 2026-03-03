import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    genre: { type: String },
    language: { type: String },
    duration: { type: Number },
    releaseYear: { type: Number },
    rating: { type: Number, min: 0, max: 10 },
    isFavorite: { type: Boolean, default: false },
    isRecommended: { type: Boolean, default: false },
    coverImage: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Song", songSchema);
