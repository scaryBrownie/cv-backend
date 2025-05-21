import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, index: true, required: true },
  icon: { type: String, required: true },
  tag: { type: String },
});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
