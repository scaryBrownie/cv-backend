import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String, required: true },
});

const Education = mongoose.model("Education", educationSchema);

export default Education;
