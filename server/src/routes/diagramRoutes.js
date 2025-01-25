import express from "express";
import Diagram from "../models/Diagram.js";

const router = express.Router();

// @desc    Create a new diagram
// @route   POST /api/diagrams
router.post("/", async (req, res) => {
  try {
    const { diagramName, blocks, connections, folderStructure } = req.body;
    const newDiagram = new Diagram({
      diagramName,
      blocks,
      connections,
      folderStructure,
    });
    const savedDiagram = await newDiagram.save();
    return res.status(201).json(savedDiagram);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc    Get a diagram by ID
// @route   GET /api/diagrams/:id
router.get("/:id", async (req, res) => {
  try {
    const diagram = await Diagram.findById(req.params.id);
    if (!diagram) {
      return res.status(404).json({ message: "Diagram not found" });
    }
    return res.status(200).json(diagram);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc    Update a diagram by ID
// @route   PUT /api/diagrams/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedDiagram = await Diagram.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDiagram) {
      return res.status(404).json({ message: "Diagram not found" });
    }
    return res.status(200).json(updatedDiagram);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// @desc    Delete a diagram by ID
// @route   DELETE /api/diagrams/:id
router.delete("/:id", async (req, res) => {
  try {
    await Diagram.findByIdAndDelete(req.params.id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const diagrams = await Diagram.find({}); // найти все документы в коллекции
    return res.status(200).json(diagrams);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
