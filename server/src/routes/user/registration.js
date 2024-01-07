const express = require("express");
const router = express.Router();
const modelUser = require("../../models/user");

router.post("/registration", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if a user with the given email already exists
    const existingUser = await modelUser.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        msg: "Email je již registrovaný",
      });
    }

    const registration = new modelUser({
      name,
      email,
    });

    // Create HASH + Salt
    registration.setPassword(password);

    const data = await registration.save();

    return res.json({
      msg: `Registrace dokončena: ${data.name}`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: `Chyba: ${err.message}. Kontaktujte Nás`,
    });
  }
});

module.exports = router;
