const route = require("express").Router();
const model = require("../../models/comment");

route.put("/put-comment", async (req, res) => {
  try {
    const { _id, postID, name, text, autorID, dateUpdate } = req.body;

    const comment = await model.findOne({ _id, postID, autorID });

    if (comment) {
      // Update comment data if user update input
      comment.name = name || comment.name;
      comment.text = text || comment.text;
      comment.dateUpdate = dateUpdate || comment.dateUpdate;
      comment.__v++;

      // Save update commit
      await comment.save();

      return res.json({
        msg: "Komentář aktualizován",
      });
    } else {
      return res.status(400).json({
        msg: "Komentář neexistuje",
      });
    }
  } catch (err) {
    return res.status(500).json({
      msg: `Chyba: ${err}`,
    });
  }
});

module.exports = route;