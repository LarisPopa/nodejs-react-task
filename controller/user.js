const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER
const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if user already exists in database
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).send("User already exists!");

    //hash password
    const hashPassword = await bcrypt.hash(password, 10);

    //create user
    const user = new User({ email, password: hashPassword });
    await user.save();
    //create access
    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      accessToken,
      email: user.email,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

//LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if the user exists by email
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send("Invalid credentials!");

    //check password is correct
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(400).send("Invalid password");

    //create access
    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "8h" }
    );
    return res.json({
      accessToken,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
  }
};

//LOGOUT
const logOut = async (req, res) => {
  try {
    //TODO: clear access token
    return res.status(200).json({ msg: "User logged out!" });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  register,
  login,
  logOut,
};
