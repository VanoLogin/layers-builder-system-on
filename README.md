# ReactFlow Diagram Builder

This is a React-based application for creating, editing, and managing diagrams using **ReactFlow**. The application allows users to create layers, blocks, and connections while providing features such as saving diagrams, exporting them to PDF, and editing block properties.

---

## Features

- **Dynamic Layers**: Create and manage layers with a folder-like structure.
- **Custom Blocks**: Add blocks with customizable properties (color, shape, label, etc.).
- **Connections**: Connect blocks visually to represent relationships.
- **Diagram Persistence**: Save diagrams to a database and load them later.
- **PDF Export**: Export diagrams as PDF files.
- **Interactive Editor**: Real-time updates of block properties and positions.

---

## Installation
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Start server
cd server
npm run dev

# Start client
cd ../client
npm run dev

#### files
├── server/                 # Backend server
│   ├── src/
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── index.js        # Server entry point
│   └── .env                # Server environment variables
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── store/          # Redux store
│   │   └── App.jsx         # Main app file
│   └── .env                # Client environment variables
└── README.md               # Documentation


#### API Endpoints

GET /diagrams

Retrieve all saved diagrams.

GET /diagrams/:id

Retrieve a specific diagram by ID.

POST /diagrams

Save a new diagram.

PUT /diagrams/:id

Update an existing diagram by ID.


#### Usage

Creating a Diagram
	1.	Use the Add Layer button to create a new layer.
	2.	Select the layer and click Add Block to create a new block.
	3.	Drag and position blocks on the canvas.

Saving a Diagram
	•	Use the Save Diagram button to save the current diagram to the database.

Exporting to PDF
	•	Click the Export PDF button to generate a PDF of the current diagram.

Loading Diagrams
	•	Select a saved diagram from the dropdown in the toolbar to load it into the editor.
