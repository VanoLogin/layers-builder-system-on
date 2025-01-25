import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Background,
  Controls,
} from "reactflow";
import { selectBlock, updateBlock, setEdges } from "../store/diagramSlice";

function CanvasView() {
  const dispatch = useDispatch();
  const blocks = useSelector((state) => state.diagram.blocks);
  const connections = useSelector((state) => state.diagram.connections);
  const selectedLayerId = useSelector((state) => state.diagram.selectedLayerId);

  // Фильтрация блоков по выбранному слою
  const visibleBlocks = selectedLayerId
    ? blocks.filter((b) => b.layerId === selectedLayerId)
    : blocks;

  // Формирование React Flow nodes
  const nodesData = visibleBlocks.map((block) => ({
    id: block.id,
    type: "default",
    data: { label: block.label || "Block" },
    position: {
      x: block.x ?? 100,
      y: block.y ?? 100,
    },
    style: {
      background: block.color || "#CCC",
      border: `1px solid ${block.stroke || "#000"}`,
      borderRadius: block.shape === "circle" ? "50%" : "0",
      width: block.shape === "circle" ? 60 : 100,
      height: block.shape === "circle" ? 60 : 40,
    },
  }));

  const edgesData = connections.map((conn) => ({
    id: conn.id,
    source: conn.sourceId,
    target: conn.targetId,
    type: conn.style || "default",
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(nodesData);
  const [edges, setEdgesState, onEdgesChange] = useEdgesState(edgesData);

  // Синхронизация узлов с блоками
  useEffect(() => {
    setNodes(nodesData);
  }, [blocks, selectedLayerId, onEdgesChange]);

  // Синхронизация рёбер с connections
  useEffect(() => {
    setEdgesState(edgesData);
  }, [connections]);

  // Обработка изменения позиций узлов
  const handleNodesChange = (changes) => {
    changes.forEach((change) => {
      if (change.type === "position" && change.position) {
        dispatch(
          updateBlock({
            id: change.id,
            updates: {
              x: change.position.x,
              y: change.position.y,
            },
          })
        );
      }
    });
    onNodesChange(changes); // Продолжаем стандартную обработку
  };

  // Обработка изменения рёбер
  const handleEdgesChange = (changes) => {
    const updatedEdges = [...edges];
    changes.forEach((change) => {
      if (change.type === "remove") {
        const index = updatedEdges.findIndex((edge) => edge.id === change.id);
        if (index > -1) updatedEdges.splice(index, 1);
      }
    });
    setEdgesState(updatedEdges);
    dispatch(setEdges(updatedEdges)); // Сохраняем в Redux
  };

  // Добавление нового ребра
  const handleConnect = (connection) => {
    const newEdge = {
      id: `edge-${Date.now()}`,
      sourceId: connection.source,
      targetId: connection.target,
      style: "default", // Добавьте больше полей, если нужно
    };
    setEdgesState((prev) => [...prev, newEdge]);
    dispatch(setEdges([...connections, newEdge])); // Добавляем в Redux
  };

  // Обработка клика по узлу
  const onNodeClick = useCallback(
    (event, node) => {
      dispatch(selectBlock(node.id));
    },
    [dispatch]
  );

  return (
    <div style={{ flex: 1, height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect} // Обработка новых рёбер
        onNodeClick={onNodeClick}
        nodesDraggable
        nodesConnectable
        fitView
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default CanvasView;
