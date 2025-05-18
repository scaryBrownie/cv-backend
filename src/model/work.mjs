import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  period: { type: String, required: true },
  description: { type: String, required: true },
});

const Work = mongoose.model("Work", workSchema);

export default Work;
