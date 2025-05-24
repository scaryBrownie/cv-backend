///AUTH EXAMPLE
import User from "../model/user.mjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    if (
      req.body.username &&
      req.body.username === "admin" &&
      req.body.password &&
      req.body.password === "admin"
    ) {
      const user = await User.findOne({ username: req.body.username }).select(
        "-password"
      );
      if (!user) {
        res.status(401).json({
          message: "Invalid username or password",
        });
      }

      const accessToken = jwt.sign(
        {
          id: user._id,
          username: user.username,
          passwordChangeAt: user.passwordChangeAt,
        },
        "secret-key",
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        {
          id: user._id,
          username: user.username,
          passwordChangeAt: user.passwordChangeAt,
        },
        "secret-key",
        { expiresIn: "7d" }
      );

      user.refreshToken = refreshToken;

      await user.save();

      res.cookie("my_auth_token", accessToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 3600000),
      });

      res.cookie("my_refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      res.status(200).json({
        message: "Login successful",
        user: user,
      });
    } else {
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exporess;
