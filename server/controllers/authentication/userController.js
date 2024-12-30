const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

const SECRET_KEY = process.env.SECRET_KEY;

// signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      return res
        .status(409)
        .json({
          success: false,
          message:
            "Email already exists. Please use a different email or log in.",
        });
    }
    await newUser.save();
    res.status(200).json({
      success: true,
      message: `Account created successfully, ${name}! Welcome to GamerForge. Please log in to access your account.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occured",
    });
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCheck = await User.findOne({ email });
    if (!userCheck) {
      return res
        .status(404)
        .json({
          success: false,
          message: "User not found. Please sign up first.",
        });
    }

    const passwordMatch = await bcrypt.compare(password, userCheck.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Incorrect password. Please try again.",
        });
    }

    // Create a token without including the password
    const token = jwt.sign(
      {
        name: userCheck.name,
        id: userCheck._id,
        email: userCheck.email,
        role: userCheck.role,
      },
      SECRET_KEY,
      { expiresIn: "50m" }
    );

    // Set a cookie with the token (expires in 50 minutes)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      // sameSite: 'strict',
      maxAge: 50 * 60 * 1000
    });

    // Respond with success
    res
      .status(200)
      .json({ success: true, message: "Login successful.", user: userCheck });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

// logout

const logout = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      // sameSite: 'strict',
      // maxAge: 50 * 60 * 1000 // ensure settings match the cookie set in login
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred during logout" });
  }
};


// middleware to authenticate the user

const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Invalid token. Please log in." });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Token verification failed. Please log in again." });
    }

    req.user = user;

    next();
  });
};


module.exports = {
  signup,
  login,
  logout,
  authenticate
};
