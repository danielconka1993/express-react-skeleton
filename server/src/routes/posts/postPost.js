const router = require("express").Router();
const modelPost = require("../../models/post");

router.post("/save-post", async (req, res) => {
  const { name, text, autorID, date } = req.body;

  try{
    // create new Post
    await modelPost.create({
      name,
      text,
      autorID,
      date,
    });

    res.json({
      success: true,
      msg: "Článek přidán",
    });
  } catch (err) {
    // MongoDB duplicate postName
    if (err.code === 11000) {
      res.status(400).json({
        msg: `Článek ${name} již existuje`,
        success: false,
      });
      return;
    } else {
      res.status(500).json({
        msg: `Chyba: ${err}. Kontaktujte Nás`,
        success: false,
      });
    }
  }
});

module.exports = router;


  // post
  //   .save()
  //   .then((post) => {
  //     res.json({
  //       // msg: `Článek přidán ${JSON.stringify(post)}`,
  //       msg: `Článek ${name} přidán`,
  //       success: true,
  //     });
  //   })
  //   .catch((err) => {
  //     if (err.code === 11000) {
  //       // MongoDB duplicate key error
  //       res.status(400).json({
  //         msg: `Článek ${name} existuje`,
  //         success: false,
  //       });
  //     } else {
  //       res.status(500).json({
  //         msg: "Neodesláno",
  //         success: false,
  //       });
  //     }
  //   });