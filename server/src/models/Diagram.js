import mongoose from "mongoose";

const diagramSchema = new mongoose.Schema({
  diagramName: { type: String, required: true },
  blocks: { type: Array, default: [] },
  connections: { type: Array, default: [] },
  folderStructure: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Diagram", diagramSchema);
