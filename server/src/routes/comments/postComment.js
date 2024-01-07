const router = require("express").Router();
const modelCommit = require("../../models/comment");

router.post("/save-comment", async (req, res) => {
  const { postID, name, text, autorID, date, dateUpdate } = req.body;

  try {
    // create new Commit
    await modelCommit.create({
      postID,
      name,
      text,
      autorID,
      date,
      dateUpdate,
    });

    return res.json({
      msg: "Komentář přidán",
    });
  } catch (err) {
    return res.status(500).json({
      msg: `Chyba: ${err}. Kontaktujte Nás`,
    });
  }
});

module.exports = router;