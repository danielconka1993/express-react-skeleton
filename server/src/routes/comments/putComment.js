const route = require("express").Router();
const model = require("../../models/comment");

route.put("/put-comment", async (req, res) => {
    try {
      const { _id, postID, name, text, autorID, dateUpdate, __v } = req.body;
  
      // Zde by mělo být ošetření, zda je `_id` ve správném formátu atd.
  
      const comment = await model.findOne({ _id, postID, autorID });
  
      if (comment) {
        // Aktualizujte pouze pole, která jsou obsažena v těle požadavku
        comment.name = name || comment.name;
        comment.text = text || comment.text;
        comment.dateUpdate = dateUpdate || comment.dateUpdate;
        comment.__v = __v || comment.__v;
  
        // Uložte aktualizovaný příspěvek
        await comment.save();
  
        res.status(200).json({
          msg: "Komentář aktualizován",
          success: true,
        });
      } else {
        res.status(400).json({ msg: "Komentář neexistuje", success: false });
      }
    } catch (err) {
      res.status(500).json({ msg: `Chyba: ${err}`, success: false });
    }
  });

  module.exports = route;