import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLayer } from "../store/diagramSlice";

const AddLayerButton = () => {
  const dispatch = useDispatch();
  const [layerName, setLayerName] = useState("");

  const handleAddLayer = () => {
    if (!layerName.trim()) {
      alert("Please enter a layer name");
      return;
    }
    dispatch(addLayer(layerName.trim()));
    setLayerName("");
  };

  return (
    <div style={{ marginBottom: "30px", marginTop: "30px" }}>
      <input
        type="text"
        placeholder="Layer Name"
        value={layerName}
        onChange={(e) => setLayerName(e.target.value)}
      />
      <button onClick={handleAddLayer}>Add Layer</button>
    </div>
  );
};

export default AddLayerButton;
