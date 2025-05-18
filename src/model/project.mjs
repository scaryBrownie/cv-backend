import mongoose from "mongoose";

const technologySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  technologies: [technologySchema],
  githubUrl: { type: String },
  demoUrl: { type: String },
  isVideo: { type: Boolean },
  videoId: { type: String },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
