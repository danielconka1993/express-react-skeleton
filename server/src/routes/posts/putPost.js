const route = require("express").Router();
const modelPost = require("../../models/post");

route.put("/put-post", async (req, res) => {
  try {
    const { _id, name, text, autorID, dateUpdate } = req.body;

    //finds a post
    const post = await modelPost.findOne({ _id, autorID });

    if (post) {
      // Update post data if user update input
      post.name = name || post.name;
      post.text = text || post.text;
      post.dateUpdate = dateUpdate || post.dateUpdate;
      post.__v++;

      await post.save(); // save it

      return res.json({
        msg: "Příspěvek aktualizován",
        success: true,
      });
    } else {
      return res.status(400).json({
        msg: "Příspěvek neexistuje",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: `Chyba: ${err}`,
      success: false,
    });
  }
});

module.exports = route;
