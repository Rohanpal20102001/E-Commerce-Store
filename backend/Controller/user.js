const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Sign Up User
const signUp = async (req, res) => {
  const { email, name, password, isAdmin } = req.body;

  // Check if the user already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).json({
        message: "User Already Exists!",
      });
    }
  } catch (err) {
    console.log(err);
  }

  const hashedPassword = bcrypt.hashSync(password);

  try {
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    await user.save();

    return res.status(200).json({
      userDetails: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

// Sign In User
const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Check if the user is registered or not
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found, please sign up before proceeding",
      });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
      } else {
        const payload = { email: email, isAdmin: user.isAdmin };

        const token = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            if (err) {
              return res.status(500).send(err);
            }
            return res.status(200).json({
              message: "User logged in",
              token: token,
              user: {
                user,
              },
              newLogin: user.email === "NA" ? true : false,
            });
          }
        );
        user.isAccountVerified = true;
        user.email = email;
        await user.save();
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signUp,
  signIn,
};
