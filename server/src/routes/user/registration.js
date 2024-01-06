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
        success: false,
      });
    }

    const registration = new modelUser({
      name,
      email,
    });

    // Create HASH + Salt
    registration.setPassword(password);

    const document = await registration.save();

    res.json({
      msg: `Registration complete ${JSON.stringify(document)}`,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Registration failed",
      success: false,
    });
  }
});

module.exports = router;
