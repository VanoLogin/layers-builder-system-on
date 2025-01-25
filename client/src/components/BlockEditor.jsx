import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBlock, removeBlock } from "../store/diagramSlice";

function BlockEditor() {
  const dispatch = useDispatch();
  const selectedBlockId = useSelector((state) => state.diagram.selectedBlockId);
  const blocks = useSelector((state) => state.diagram.blocks);

  // Находим выделенный блок
  const block = blocks.find((b) => b.id === selectedBlockId);

  // Локальные поля формы
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("#ccc");
  const [shape, setShape] = useState("rectangle");
  const [transparency, setTransparency] = useState(1);

  // Когда меняется selectedBlockId или сам block
  useEffect(() => {
    if (block) {
      setLabel(block.label || "");
      setColor(block.color || "#ccc");
      setShape(block.shape || "rectangle");
      setTransparency(block.transparency ?? 1);
    }
  }, [block]);

  if (!block) {
    return (
      <div
        style={{ width: "250px", borderLeft: "1px solid #ccc", padding: "8px" }}
      >
        <h3>Block Editor</h3>
        <p>No block selected</p>
      </div>
    );
  }

  const handleSave = () => {
    dispatch(
      updateBlock({
        id: block.id,
        updates: {
          label,
          color,
          shape,
          transparency: Number(transparency),
        },
      })
    );
  };

  const handleDeleteBlock = () => {
    if (window.confirm("Are you sure you want to delete this block?")) {
      dispatch(removeBlock(block.id));
    }
  };

  return (
    <div
      style={{ width: "250px", borderLeft: "1px solid #ccc", padding: "8px" }}
    >
      <h3>Edit Block</h3>
      <div style={{ marginBottom: "8px" }}>
        <label>Label: </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "8px" }}>
        <label>Color: </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "8px" }}>
        <label>Shape: </label>
        <select value={shape} onChange={(e) => setShape(e.target.value)}>
          <option value="rectangle">Rectangle</option>
          <option value="circle">Circle</option>
        </select>
      </div>
      <div style={{ marginBottom: "8px" }}>
        <label>Transparency: </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={transparency}
          onChange={(e) => setTransparency(e.target.value)}
        />
      </div>

      <button onClick={handleSave} style={{ marginRight: "8px" }}>
        Save
      </button>
      <button
        onClick={handleDeleteBlock}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Delete
      </button>
    </div>
  );
}

export default BlockEditor;
