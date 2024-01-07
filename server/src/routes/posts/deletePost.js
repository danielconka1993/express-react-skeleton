const route = require("express").Router();
const modelPost = require("../../models/post");
const modelComment = require("../../models/comment");

route.delete("/delete-post", async (req, res) => {
  try {
    const { _id, autorID } = req.body;

    const post = await modelPost.findOne({ _id, autorID }); // Find Post

    if (post) {
      // Find posts's Comments if exists and delete then
      const comments = await modelComment.find({ postID: _id });

      if (comments && comments.length > 0) {
        await modelComment.deleteMany({ postID: _id });
      }

      // Post delete
      await modelPost.deleteOne({ _id, autorID });

      return res.status(200).json({
        msg: comments.length > 0
            ? "Příspěvek a jeho komentáře byly odstraněny"
            : "Příspevek odstraněn",
      });
    } else {
      return res.status(400).json({
        msg: "Nejste autorem příspěvku. Příspěvek nebude odstraněn.",
      });
    }
  } catch (err) {
    return res.status(500).send({
      msg: `Chyba: ${err.message}. Kontaktujte Nás`,
    });
  }
});

module.exports = route;
