const express = require("express");
const router = express.Router();
const modelComment = require("../../models/comment");
const modelUser = require("../../models/user");

router.get("/get-comment", async (req, res) => {
  try {
    const postID = req.query.postID;

    if (!postID) {
      return res.status(400).json({
        msg: "ERROR - Chybějící postID.",
        comments: [],
      });
    }

    const comments = await modelComment.find({ postID }).lean();

    const commentsWithAuthorData = await Promise.all(
      comments.map(async (comment) => {
        const author = await modelUser.findById(comment.autorID).lean();
        return {
          ...comment,
          autorName: author ? author.name : null,
        };
      })
    );

    return res.json({
      msg: `Komentáře načteny Getem pro postID: ${postID}`,
      comments: commentsWithAuthorData,
    });
  } catch (err) {
    return res.status(500).json({
      msg: `Chyba: ${err}. Kontaktujte Nás.`,
      comments: [],
    });
  }
});

module.exports = router;