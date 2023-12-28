// const router = require("express").Router();
// const modelPost = require("../../models/post");

// router.get("/get-posts", async (req, res) => {
//     try {
//         // const posts = await modelPost.find({});
//         const posts = await modelPost.find({})
//         return res.json({
//           msg: "Članky načteny Getem",
//           posts: posts,
//         });
//       } catch (err) {
//         return res.json({
//           msg: `Chyba: ${err}. Kontaktuje Náš. `,
//           posts: [],
//         });
//       }
//     });

// module.exports = router;
const router = require("express").Router();
const modelPost = require("../../models/post");
const modelUser = require("../../models/user");

router.get("/get-posts", async (req, res) => {
  try {
    const posts = await modelPost.find({}).lean();

    const postsWithAuthorInfo = await Promise.all(
      posts.map(async (post) => {
        const author = await modelUser.findById(post.autorID).lean();
        return {
          ...post,
          autorName: author ? author.name : null,
        };
      })
    );

    return res.json({
      msg: "Članky načteny Getem",
      posts: postsWithAuthorInfo,
    });
  } catch (err) {
    return res.json({
      msg: `Chyba: ${err}. Kontaktujte Nás.`,
      posts: [],
    });
  }
});

module.exports = router;
