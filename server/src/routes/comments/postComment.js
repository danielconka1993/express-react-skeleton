const router = require("express").Router();
const modelCommit = require("../../models/comment");

router.post("/save-comment", (req, res) => {
  const { postID, name, text, autorID, date, dateUpdate } = req.body;

  const commit = new modelCommit({
    postID,
    name,
    text,
    autorID,
    date,
    dateUpdate
  });

  commit
    .save()
    .then((document) => {
      res.json({
        msg: `Comment Add ${JSON.stringify(document)}`,
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        msg: "Failed to save commit",
        success: false,
      });
    });
});

module.exports = router;
