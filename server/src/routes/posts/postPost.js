const router = require("express").Router();
const modelPost = require("../../models/post");

router.post("/save-post", async (req, res) => {
  const { name, text, autorID, date } = req.body;

  try {
    // create new Post
    await modelPost.create({
      name,
      text,
      autorID,
      date,
    });

    return res.json({
      msg: "Článek přidán",
    });
  } catch (err) {
    // MongoDB duplicate postName
    if (err.code === 11000) {
      return res.status(400).json({
        msg: `Článek ${name} již existuje`,
      });
    } else {
      return res.status(500).json({
        msg: `Chyba: ${err.message}. Kontaktujte Nás`,
      });
    }
  }
});

module.exports = router;