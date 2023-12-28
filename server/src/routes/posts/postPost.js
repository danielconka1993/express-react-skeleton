const router = require("express").Router();
const modelPost = require("../../models/post");

router.post("/save-post", (req, res) => {
  const { name, text, autorID, date } = req.body;

  const post = new modelPost({
    name,
    text,
    autorID,
    date,
  });

  post
    .save()
    .then((post) => {
      res.json({
        // msg: `Článek přidán ${JSON.stringify(post)}`,
        msg: `Článek ${name} přidán`,
        success: true,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        // MongoDB duplicate key error
        res.status(400).json({
          msg: `Článek ${name} existuje`,
          success: false,
        });
      } else {
        res.status(500).json({
          msg: "Neodesláno",
          success: false,
        });
      }
    });
});

module.exports = router;
