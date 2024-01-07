const express = require("express");
const jwtMiddleware = require("../../middleware/jwtMiddleware");
const router = express.Router();
const User = require("../../models/user");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        msg: "E-mail není registrovaný",
      });
    }

    if (user.validPassword(password)) {
      // JWT Token with user ID
      const token = jwtMiddleware.signToken(user._id);

      return res.send({
        msg: "Přihlášeno",
        user: [user],
        token: token, // Sending the generated token back to the client
      });
    } else {
      return res.status(400).send({
        msg: "Špatné heslo",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      msg: `Chyba: ${err.message}. Kontaktujte Nás`,
    });
  }
});

module.exports = router;
