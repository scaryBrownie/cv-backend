import jwt from "jsonwebtoken";
import User from "../model/user.mjs";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.my_auth_token;
    if (!token) {
      return res.status(401).json({ message: "something went wrong" });
    }

    const decoded = jwt.decode(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "something went wrong" });
    }

    try {
      jwt.verify(token, "my_secret_key");
      req.user = decoded;
      return next();
    } catch (err) {
      const refreshToken = req.cookies.my_refresh_token;
      if (!refreshToken) {
        return res.status(401).json({ message: "something went wrong" });
      }

      jwt.verify(refreshToken, "my_secret_key", async (err) => {
        if (err) {
          return res.status(401).json({ message: "something went wrong" });
        }

        const user = await User.findById(decoded.id);
        if (
          !user ||
          user.refreshToken !== refreshToken ||
          user.passwordChangedAt !== decoded.passwordChangedAt
        ) {
          return res.status(401).json({ message: "something went wrong" });
        }

        const newAccessToken = jwt.sign(
          {
            id: user._id,
            username: user.username,
            passwordChangedAt: user.passwordChangedAt,
          },
          "my_secret_key",
          { expiresIn: "1h" }
        );

        res.cookie("my_auth_token", newAccessToken, {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 3600000),
        });

        req.user = decoded;
        next();
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
