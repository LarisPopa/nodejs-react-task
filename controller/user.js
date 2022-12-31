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
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    //generate refresh token
    const refreshToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "6m" }
    );
    await User.updateOne({ _id: user._id }, { $set: { refreshToken } });

    return res.json({
      accessToken,
      refreshToken,
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

    //generate access token
    const accessToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    //generate refresh token
    const refreshToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "6m" }
    );

    await User.updateOne({ _id: user._id }, { $set: { refreshToken } });
    return res.json({
      accessToken,
      refreshToken,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
  }
};

//LOGOUT
const logOut = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.user._id },
      { $set: { refreshToken: null } }
    );

    return res.status(200).json({ msg: "User logged out!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

//GENERATE NEW ACCESS TOKEN
const generateNewAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(400).json({ msg: "No refresh token provided" });

  const user = await User.findOne({ refreshToken });
  if (!user) return res.status(400).send("No user found!");

  //generate access token
  const accessToken = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );

  return res.json({
    accessToken,
  });
};
module.exports = {
  register,
  login,
  logOut,
  generateNewAccessToken,
};
