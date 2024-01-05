// const route = require("express").Router();
// const modelPost = require("../../models/post");

// route.delete("/delete-post", async (req, res) => {
//     try{
//         const { _id, autorID } = req.body;
//         // To:DO - findOne?
//         // TO:DO - lze udelat i pro comment?
//         const post = await modelPost.find({ _id, autorID }); 
        
//         if(post){
//             // await post.delete();// Smazání příspěvku
//             await modelPost.deleteOne({ _id, autorID });

//             res.status(200).json({
//                 success:true,
//                 msg:"Přispěvěk Odstraněn",
//             })        
//         }else{
//             res.status(400).json({ msg: "Nejste Autorem Příšpeveku. Přispěvěk nebude odstraněn."})
//         }
//     } catch(err) {
//         res.status(500).send({ msg: `Chyba: ${err}` })
//     }
// })

// module.exports = route;

// const route = require("express").Router();
// const modelPost = require("../../models/post");

// route.delete("/delete-post", async (req, res) => {
//     try {
//         const { _id, autorID } = req.body;
//         const post = await modelPost.findById(_id); 
        
//         if (post && post.autorID.toString() === autorID) {
//             await modelPost.deleteOne({ _id, autorID });

//             res.status(200).json({
//                 success: true,
//                 msg: "Příspěvek byl úspěšně smazán",
//             });
//         } else {
//             res.status(400).json({
//                 success: false,
//                 msg: "Nejste autorem příspěvku nebo byl příspěvek již smazán.",
//             });
//         }
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             msg: `Chyba: ${err.message}`,
//         });
//     }
// });

// module.exports = route;


const route = require("express").Router();
const modelPost = require("../../models/post");
const modelComment = require("../../models/comment");

route.delete("/delete-post", async (req, res) => {
    try {
        const { _id, autorID } = req.body;

        // Najde příspěvek
        const post = await modelPost.findOne({ _id, autorID });

        if (post) {
            // Najde komentáře ke konkrétnímu příspěvku
            const comments = await modelComment.find({ postID: _id });

            if (comments && comments.length > 0) {
                // Smazání všech komentářů ke konkrétnímu příspěvku
                await modelComment.deleteMany({ postID: _id });
            }

            // Smazání příspěvku
            await modelPost.deleteOne({ _id, autorID });

            res.status(200).json({
                success: true,
                msg: "Příspěvek a jeho komentáře byly odstraněny",
            });
        } else {
            res.status(400).json({ msg: "Nejste autorem příspěvku. Příspěvek nebude odstraněn." });
        }
    } catch (err) {
        res.status(500).send({ msg: `Chyba: ${err}` });
    }
});

module.exports = route;
