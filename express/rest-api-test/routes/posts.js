import express from "express";
import logger from "../middleware/logger.js";
import {
  getPosts,
  getPost,
  updatePost,
  deletePost,
  createPost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", logger, getPosts);

router.get("/:id", logger, getPost);

router.post("/create", logger, createPost);

router.put("/:id", logger, updatePost);

router.delete("/:id", logger, deletePost);

export default router;
