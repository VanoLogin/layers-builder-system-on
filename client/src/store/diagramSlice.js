import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diagramName: "My Diagram",
  blocks: [],
  connections: [],
  folderStructure: [],
  currentDiagramId: null,
  selectedLayerId: null,
  selectedBlockId: null,
  allDiagrams: [],
};

const diagramSlice = createSlice({
  name: "diagram",
  initialState,
  reducers: {
    updateFolderStructure: (state, action) => {
      state.folderStructure = action.payload; // Обновляем дерево
    },
    setEdges: (state, action) => {
      state.connections = action.payload;
    },
    addEdge: (state, action) => {
      state.connections.push(action.payload);
    },
    updateEdge: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.connections.findIndex((edge) => edge.id === id);
      if (index > -1) {
        state.connections[index] = { ...state.connections[index], ...updates };
      }
    },
    removeEdge: (state, action) => {
      const edgeId = action.payload;
      state.connections = state.connections.filter(
        (edge) => edge.id !== edgeId
      );
    },
    setAllDiagrams: (state, action) => {
      state.allDiagrams = action.payload; // Устанавливаем массив всех диаграмм
    },
    setDiagramState: (state, action) => {
      const { diagramName, blocks, connections, folderStructure, _id } =
        action.payload;
      state.diagramName = diagramName;
      state.blocks = blocks || [];
      state.connections = connections || [];
      state.folderStructure = folderStructure || [];
      state.currentDiagramId = _id || null;
      state.selectedLayerId = null;
      state.selectedBlockId = null;
    },
    addBlock: (state, action) => {
      state.blocks.push(action.payload);
    },
    updateBlock: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.blocks.findIndex((b) => b.id === id);
      if (index > -1) {
        state.blocks[index] = { ...state.blocks[index], ...updates };
      }
    },
    removeBlock: (state, action) => {
      const blockId = action.payload;
      state.blocks = state.blocks.filter((b) => b.id !== blockId);
    },
    selectBlock: (state, action) => {
      state.selectedBlockId = action.payload;
    },
    addLayer: (state, action) => {
      const newLayer = {
        id: `layer-${Date.now()}`,
        name: action.payload || "New Layer",
        children: [],
      };
      state.folderStructure.push(newLayer);
    },
    selectLayer: (state, action) => {
      state.selectedLayerId = action.payload;
      state.selectedBlockId = null;
    },
    deleteLayer: (state, action) => {
      const layerId = action.payload;
      state.folderStructure = state.folderStructure.filter(
        (layer) => layer.id !== layerId
      );
      // удаляем блоки
      state.blocks = state.blocks.filter((b) => b.layerId !== layerId);
      if (state.selectedLayerId === layerId) {
        state.selectedLayerId = null;
      }
    },
  },
});

export const {
  setAllDiagrams,
  setDiagramState,
  addBlock,
  updateBlock,
  removeBlock,
  selectBlock,
  addLayer,
  selectLayer,
  deleteLayer,
  setEdges,
  addEdge,
  updateEdge,
  removeEdge,
  updateFolderStructure,
} = diagramSlice.actions;

export default diagramSlice.reducer;
