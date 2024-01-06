const router = require("express").Router();
const modelCommit = require("../../models/comment");

router.post("/save-comment", async (req, res) => {
  const { postID, name, text, autorID, date, dateUpdate } = req.body;

  try{
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
      success: true,
      msg: "Komentář přidán"
    })

  } catch (err) {
    return res.status(500).json({
      msg: `Chyba: ${err}. Kontaktujte Nás`,
      success: false,
    })
  }
});

module.exports = router;


// const commit = new modelCommit({
//   postID,
//   name,
//   text,
//   autorID,
//   date,
//   dateUpdate
// });

// commit
//   .save()
//   .then((document) => {
//     res.json({
//       msg: `Comment Add ${JSON.stringify(document)}`,
//       success: true,
//     });
//   })
//   .catch((err) => {
//     res.json({
//       msg: "Failed to save commit",
//       success: false,
//     });
//   });