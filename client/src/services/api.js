import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api", // или ваш адрес
});

// Получить одну диаграмму по ID
export const fetchDiagram = (id) => API.get(`/diagrams/${id}`);
// Создать новую
export const createDiagram = (payload) => API.post("/diagrams", payload);
// Обновить диаграмму
export const updateDiagram = (id, payload) =>
  API.put(`/diagrams/${id}`, payload);
// Удалить диаграмму
export const deleteDiagram = (id) => API.delete(`/diagrams/${id}`);

// Получить все диаграммы
export const fetchAllDiagrams = () => API.get("/diagrams");
