import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const key = Buffer.from(process.env.ENCRYPT_KEY, "utf8");
const iv = Buffer.from(process.env.ENCRYPT_IV, "utf8");

export const decryptData = (encryptedData) => {
  const algorithm = "aes-256-cbc";
  let decrypted = "";
  try {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    decrypted = decipher.update(encryptedData, "base64", "utf8");
    decrypted += decipher.final("utf8");
  } catch (error) {
    console.error("Decryption failed:", error);
  }
  return decrypted;
};

export const encryptData = (text) => {
  let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("base64");
};
