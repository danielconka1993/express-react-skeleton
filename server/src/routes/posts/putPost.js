const route = require("express").Router();
const modelPost = require("../../models/post");

route.put("/put-post", async (req, res) => {
    try {
      const { _id, name, text, autorID, __v, dateUpdate } = req.body;
  
      // Zde by mělo být ošetření, zda je `_id` ve správném formátu atd.
  
      const post = await modelPost.findOne({ _id, autorID });
  
      if (post) {
        // Aktualizujte pouze pole, která jsou obsažena v těle požadavku
        // TO:DO - zdali potreba nebo
        post.name = name || post.name;
        post.text = text || post.text;
        post.dateUpdate = dateUpdate || post.dateUpdate;
        post.__v = __v || post.__v;
  
        // Uložte aktualizovaný příspěvek
        await post.save();
  
        res.status(200).json({
          msg: "Příspěvek aktualizován",
          success: true,
        });
      } else {
        res.status(400).json({ msg: "Příspěvek neexistuje", success: false });
      }
    } catch (err) {
      res.status(500).json({ msg: `Chyba: ${err}`, success: false });
    }
  });

  module.exports = route;