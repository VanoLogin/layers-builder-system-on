import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";

// Экшены и API
import { fetchAllDiagrams } from "./services/api";
import { setAllDiagrams, setDiagramState } from "./store/diagramSlice";

// Компоненты
import Toolbar from "./components/Toolbar";
import FolderDirectory from "./components/FolderDirectory";
import CanvasView from "./components/CanvasView";
import BlockEditor from "./components/BlockEditor";
import FolderTree from "./components/FolderTree";
import AddLayerButton from "./components/AddLayerButton";

function App() {
  const dispatch = useDispatch();
  const allDiagrams = useSelector((state) => state.diagram.allDiagrams);
  const diagramName = useSelector((state) => state.diagram.diagramName);

  // Фетч всех диаграмм при загрузке
  useEffect(() => {
    const loadDiagrams = async () => {
      try {
        const { data } = await fetchAllDiagrams();
        dispatch(setAllDiagrams(data)); // Сохраняем все диаграммы в стейт
        if (data.length > 0) {
          dispatch(setDiagramState(data[0])); // Устанавливаем первую диаграмму как активную
        }
      } catch (error) {
        console.error("Failed to fetch diagrams:", error);
      }
    };
    loadDiagrams();
  }, [dispatch]);

  // Обработчик выбора диаграммы
  const handleDiagramSelect = (diagramId) => {
    const selectedDiagram = allDiagrams.find((d) => d._id === diagramId);
    if (selectedDiagram) {
      dispatch(setDiagramState(selectedDiagram));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Toolbar />
      <div
        style={{
          background: "#f3f3f3",
          padding: "8px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "30px",
        }}
      >
        <h2>{diagramName || "No Diagram Selected"}</h2>
        {/* Dropdown для выбора диаграммы */}
        <select
          onChange={(e) => handleDiagramSelect(e.target.value)}
          style={{ padding: "4px", fontSize: "16px" }}
        >
          <option value="">Select a diagram</option>
          {allDiagrams.map((diagram) => (
            <option key={diagram._id} value={diagram._id}>
              {diagram.diagramName || "Untitled Diagram"}
            </option>
          ))}
        </select>
      </div>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <FolderDirectory />
        <ReactFlowProvider>
          <CanvasView />
          <BlockEditor />
        </ReactFlowProvider>
      </div>
      <FolderTree />
      <AddLayerButton />
    </div>
  );
}

export default App;
