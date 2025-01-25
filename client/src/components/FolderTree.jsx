import { useSelector, useDispatch } from "react-redux";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { selectLayer, deleteLayer } from "../store/diagramSlice";

const FolderTree = () => {
  const dispatch = useDispatch();
  const folderStructure = useSelector((state) => state.diagram.folderStructure);
  const selectedLayerId = useSelector((state) => state.diagram.selectedLayerId);

  // Рекурсивная функция для отрисовки дерева
  const renderTree = (nodes) =>
    nodes.map((node) => {
      const label = (
        <span
          onClick={() => dispatch(selectLayer(node.id))}
          style={{
            cursor: "pointer",
            fontWeight: node.id === selectedLayerId ? "bold" : "normal",
          }}
        >
          {node.name}
        </span>
      );

      return (
        <TreeView
          key={node.id}
          nodeLabel={label}
          collapsed={node.collapsed || false}
          onClick={() => toggleCollapse(node)}
        >
          {node.children && node.children.length > 0
            ? renderTree(node.children)
            : null}
        </TreeView>
      );
    });

  // Функция для переключения видимости узла
  const toggleCollapse = (node) => {
    node.collapsed = !node.collapsed;
    dispatch({ type: "UPDATE_FOLDER_STRUCTURE", payload: folderStructure }); // Обновляем Redux
  };

  // Обработчик удаления узла
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
      {renderTree(folderStructure)}
      <button onClick={() => handleDeleteLayer(selectedLayerId)}>Delete</button>
    </div>
  );
};

export default FolderTree;
