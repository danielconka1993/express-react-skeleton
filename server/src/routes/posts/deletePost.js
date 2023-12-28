const route = require("express").Router();
const modelPost = require("../../models/post");

route.delete("/delete-post", async (req, res) => {
    try{
        const { _id, autorID } = req.body;
        // To:DO - findOne?
        // TO:DO - lze udelat i pro comment?
        const post = await modelPost.find({ _id, autorID }); 
        
        if(post){
            // await post.delete();// Smazání příspěvku
            await modelPost.deleteOne({ _id, autorID }); // Použijte deleteOne pro smazání


            res.status(200).json({
                msg:"Přispevěk Odstraněn",
                success:true
            })        
        }else{
            res.status(400).json({ msg: "Nejste Autorem Příšpeveku. Přispěvěk NEondstraněn."})
        }
    } catch(err) {
        res.status(500).send({ msg: `Chyba: ${err}` })
    }
})

module.exports = route;