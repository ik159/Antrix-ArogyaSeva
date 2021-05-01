const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../auth/auth');

router.get("/",postController.getPosts);
router.post("/",auth.verifyUser,postController.createPost);
router.get("/:id",postController.getPost);
router.delete("/:id",auth.verifyUser,auth.isAuthor,postController.deletePost);

router.get("/:id/replies",postController.getReplies);
router.post("/:id/replies",auth.verifyUser,postController.createReply);
router.get("/:id/replies/:replyId",postController.getReply);
router.delete("/:id/replies/:replyId",auth.verifyUser,auth.isAuthor,postController.deleteReply);

module.exports = router;