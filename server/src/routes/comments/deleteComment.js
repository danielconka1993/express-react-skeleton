const route = require("express").Router();
const model = require("../../models/comment");

route.delete("/delete-comment", async (req, res) => {
  try {
    const { _id, postID, autorID } = req.body;
    const comment = await model.findOne({ _id, postID, autorID });

    if (comment) {
      await model.deleteOne({ _id, postID, autorID });

      return res.status(200).json({
        msg: "Komentář Odstraněn",
      });
    } else {
      return res.status(400).json({
        msg: "Nejste Autorem Komentáře. Komentář Nesmazán",
      });
    }
  } catch (err) {
    return res.status(500).send({
      msg: `Chyba: ${err}`,
    });
  }
});

module.exports = route;