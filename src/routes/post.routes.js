const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
// import controller buat post
const { authAny } = require("../middleware/auth.middleware");
// middleware buat ngecek token JWT, semua route post butuh token JWT

router.post("/", authAny, postController.createPost);

router.get("/", authAny, postController.getAllPosts);
router.get("/:id", authAny, postController.getPostById);

router.put("/:id", authAny, postController.updatePost);
router.delete("/:id", authAny, postController.deletePost);
// semua route post butuh token JWT, jadi pake middleware authAny
// buat create, get all, get by id, update, delete post

module.exports = router;
