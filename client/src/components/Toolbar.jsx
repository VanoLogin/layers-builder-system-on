// src/components/Toolbar.jsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLayer, addBlock } from "../store/diagramSlice";
import { createDiagram, updateDiagram } from "../services/api";

// Для экспорта PDF
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Toolbar() {
  const dispatch = useDispatch();
  const {
    diagramName,
    blocks,
    connections,
    folderStructure,
    currentDiagramId,
    selectedLayerId,
  } = useSelector((state) => state.diagram);

  // Локальное состояние для названия нового слоя
  const [newLayerName, setNewLayerName] = useState("");

  // Создание нового слоя
  const handleAddLayer = () => {
    dispatch(addLayer(newLayerName.trim() || "New Layer"));
    setNewLayerName("");
  };

  // Создание нового блока (привязка к выбранному слою)
  const handleAddBlock = () => {
    if (!selectedLayerId) {
      alert("Please select a layer first!");
      return;
    }
    const newBlock = {
      id: `block-${Date.now()}`,
      label: "New Block",
      x: 100,
      y: 100,
      color: "#f39c12",
      stroke: "#000",
      shape: "rectangle",
      layerId: selectedLayerId,
    };
    dispatch(addBlock(newBlock));
  };

  // Сохранение диаграммы (POST или PUT)
  const handleSaveDiagram = async () => {
    const payload = {
      diagramName,
      blocks,
      connections,
      folderStructure,
    };
    try {
      if (currentDiagramId) {
        // Обновляем существующую диаграмму
        await updateDiagram(currentDiagramId, payload);
        alert("Diagram updated!");
      } else {
        // Создаём новую диаграмму
        const { data } = await createDiagram(payload);
        alert(`Diagram saved! ID: ${data._id}`);
        // Опционально можно задиспатчить setDiagramState(data) для установки ID
      }
    } catch (error) {
      console.error("Save Diagram Error:", error);
    }
  };

  // Экспорт текущего вида Canvas в PDF
  const handleExportPDF = async () => {
    // Ищем элемент .react-flow (обёртка для Canvas)
    const canvasContainer = document.querySelector(".react-flow");
    if (!canvasContainer) {
      alert("Canvas not found!");
      return;
    }
    try {
      // Делаем скриншот контейнера (включая ноды/коннекторы)
      const canvas = await html2canvas(canvasContainer);
      const dataURL = canvas.toDataURL("image/png");

      // Создаём PDF с размерами равными размеру canvas
      const pdf = new jsPDF("l", "pt", [canvas.width, canvas.height]);
      // Добавляем изображение в PDF (x=0, y=0, ширина canvas.width, высота canvas.height)
      pdf.addImage(dataURL, "PNG", 0, 0, canvas.width, canvas.height);

      // Сохраняем
      pdf.save("diagram.pdf");
    } catch (error) {
      console.error("Export PDF Error:", error);
    }
  };

  return (
    <div
      style={{
        height: "50px",
        borderBottom: "1px solid #ccc",
        padding: "8px",
        display: "flex",
        gap: "8px",
      }}
    >
      {/* Поле ввода для названия нового слоя */}
      <input
        type="text"
        placeholder="Layer Name"
        value={newLayerName}
        onChange={(e) => setNewLayerName(e.target.value)}
      />
      <button onClick={handleAddLayer}>Add Layer</button>

      <button onClick={handleAddBlock}>Add Block</button>

      <button onClick={handleSaveDiagram}>Save Diagram</button>

      {/* Кнопка для экспорта в PDF */}
      <button onClick={handleExportPDF}>Export PDF</button>
    </div>
  );
}

export default Toolbar;
