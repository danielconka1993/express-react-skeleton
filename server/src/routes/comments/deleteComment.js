const route = require("express").Router();
const model = require("../../models/comment");

route.delete("/delete-comment", async (req, res) => {
    try{
        const {_id, postID, autorID} = req.body;
        const comment = await model.findOne({ _id, postID,  autorID });

        if(comment){
            await model.deleteOne({ _id, postID, autorID });

            res.status(200).json({
                msg: "Komentář Odstraněn",
                success: true
            })
        } else{
            res.status(400).json({
                msg: "Nejste Autorem Komentáře. Komentář Nesmazán"
            })
        }

    } catch (err){
        res.status(500).send({ msg: `Chyba: ${err}`})
    }
})

module.exports = route;