import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLayer, deleteLayer } from "../store/diagramSlice";

const FolderDirectory = () => {
  const dispatch = useDispatch();
  const folderStructure = useSelector((state) => state.diagram.folderStructure);
  const selectedLayerId = useSelector((state) => state.diagram.selectedLayerId);

  const handleSelectLayer = (layerId) => {
    dispatch(selectLayer(layerId));
  };

  const handleDeleteLayer = (layerId) => {
    if (window.confirm("Are you sure you want to delete this layer?")) {
      dispatch(deleteLayer(layerId));
    }
  };

  return (
    <div
      style={{
        width: "250px",
        borderRight: "1px solid #ccc",
        padding: "8px",
        overflowY: "auto",
      }}
    >
      <h3>Layers</h3>
      {folderStructure.map((layer) => (
        <div
          key={layer.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
            backgroundColor:
              layer.id === selectedLayerId ? "#e6f7ff" : "transparent",
            margin: "4px 0",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
          onClick={() => handleSelectLayer(layer.id)}
        >
          <span>{layer.name}</span>
          <button
            style={{ marginLeft: "8px" }}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteLayer(layer.id);
            }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default FolderDirectory;
