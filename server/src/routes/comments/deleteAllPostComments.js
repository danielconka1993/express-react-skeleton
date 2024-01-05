// const route = require("express").Router();
// const model = require("../../models/comment");

// route.delete("/delete-all-post-comments", async (req, res) => {
//     try{
//         const {postID} = req.body;
//         const comments = await model.find({ postID });

//         if(comments && comments.length > 0){
//             await model.deleteMany({postID});

//             res.status(200).json({
//                 msg: "Komentáře Článku odstraněny",
//                 success: true
//             })
//         } else{
//             res.status(400).json({
//                 msg: "Nesmázáno"
//             })
//         }

//     } catch (err){
//         res.status(500).send({ msg: `Chyba: ${err}`})
//     }
// })

// module.exports = route;