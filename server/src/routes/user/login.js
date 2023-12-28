const express = require('express');
const jwtMiddleware = require("../../middleware/jwtMiddleware")
const router = express.Router();
const User = require('../../models/user');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            // console.error("Neni uzivatel")
            return res.status(400).send({
                msg: "Uživatel nenalezen."
            });
        }

        if (user.validPassword(password)) {
            // Vytvoření JWT tokenu
            const token = jwtMiddleware.signToken(user._id);

            return res.status(201).send({
                msg: "Přihlášeno",
                user: [user],
                success: true,
                token: token // Poslání vytvořeného tokenu zpět klientovi 
            });
        } else {
            return res.status(400).send({
                msg: "Špatné heslo"
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            msg: `Chyba: ${err}. Kontaktuje Náš. `
        });
    }
});

module.exports = router;