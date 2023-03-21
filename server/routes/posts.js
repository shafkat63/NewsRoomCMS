import express from "express";

import {
	getPostsBySearch,
	getPosts,
	getPost,
	createPost,
	updatePost,
	deletePost,
	commentPost,
	getPostsByCreator,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get('/creator', getPostsByCreator);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.get("/", getPosts);
router.post("/", auth, createPost);
router.get("/:id", getPost);
router.patch("/:id", auth, updatePost);

router.post("/:id/commentPost", auth, commentPost);

router.delete("/:id", auth, deletePost);

export default router;
