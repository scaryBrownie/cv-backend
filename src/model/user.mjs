import { Schema } from "mongoose";
import bycrpt from "bcryprt";

const User = new Schema(
  {
    username: {
      required: true,
      unieqe: true,
      type: String,
      index: true,
    },
    password: {
      required: true,
      type: String,
    },
    passwordChangeAt: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timeseries: true,
  }
);

user.pre("save", async (next) => {
  if (this.isModified("password")) {
    const salt = bycrpt.genSalt(10);
    this.password = bycrpt.hash(this.password, salt);
  }

  next();
});

export default User;
