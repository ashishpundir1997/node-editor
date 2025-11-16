# Pipeline Builder - Visual Node Editor

A visual drag-and-drop pipeline builder built with React and FastAPI. Create complex data processing pipelines by connecting nodes with different functionalities.

![Pipeline Builder](https://img.shields.io/badge/React-18.2.0-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green) ![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

- 🎨 **Visual Node Editor** - Intuitive drag-and-drop interface for building pipelines
- 🔗 **Connection System** - Connect nodes to create complex data flows
- 🌓 **Dark/Light Theme** - Toggle between themes for comfortable viewing
- ✅ **Pipeline Validation** - Automatic DAG (Directed Acyclic Graph) detection
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎯 **Multiple Node Types** - 11+ specialized node types for various operations

## 📦 Available Node Types

| Node Type | Description |
|-----------|-------------|
| **Input** | Entry point for data into the pipeline |
| **Output** | Exit point for processed data |
| **LLM** | Large Language Model integration with customizable prompts |
| **Text** | Text processing with variable interpolation support |
| **Concat** | Concatenate two strings together |
| **Math** | Mathematical operations (add, subtract, multiply, divide) |
| **Split** | Split text by a specified separator |
| **Delay** | Add time delays to pipeline execution |
| **HTTP** | Make HTTP requests with custom headers |
| **Uppercase** | Convert text to uppercase |

## 🛠️ Prerequisites

Before running this application, ensure you have:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8.0 or higher) - [Download](https://www.python.org/)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **pip** - Python package manager (comes with Python)

### Verify Installation

```bash
# Check Node.js version
node --version

# Check Python version
python --version

# Check npm version
npm --version
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ashishpundir1997/node-editor.git
cd node-editor
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be running at **http://localhost:8000**

### 3. Frontend Setup

Open a **new terminal** window:

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Update .env file for local development
# Edit frontend/.env and set:
# REACT_APP_API_URL=http://localhost:8000

# Start the frontend development server
npm start
```

The application will automatically open at **http://localhost:3000**

## 📖 Detailed Setup Instructions

### Option A: Local Development (Backend + Frontend)

This is the recommended approach for development.

#### Step 1: Setup Backend

```bash
cd backend

# Create a virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

You should see output like:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
```

#### Step 2: Configure Frontend Environment

Edit `frontend/.env`:

```properties
# Use local backend
REACT_APP_API_URL=http://localhost:8000

# Comment out production URL
# REACT_APP_API_URL=https://node-editor-7xgn.onrender.com
```

#### Step 3: Start Frontend

In a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The browser will automatically open to `http://localhost:3000`

### Option B: Using Production Backend

If you only want to run the frontend and use the deployed backend:

```bash
cd frontend

# Ensure .env uses production URL
# REACT_APP_API_URL=https://node-editor-7xgn.onrender.com

# Install dependencies
npm install

# Start frontend
npm start
```

## 🎯 How to Use

### Creating Your First Pipeline

1. **Add Nodes**
   - Drag node types from the left toolbar onto the canvas
   - Each node represents a processing step

2. **Configure Nodes**
   - Click on any node to open its configuration panel
   - Set node-specific parameters (name, type, values, etc.)

3. **Connect Nodes**
   - Drag from a **source handle** (right side of node)
   - Drop on a **target handle** (left side of another node)
   - Connections represent data flow

4. **Validate Pipeline**
   - Click the **Submit** button in the top toolbar
   - System validates if the pipeline is a valid DAG
   - Results show: number of nodes, edges, and DAG status

### Node Configuration Examples

#### Input Node
```
Name: user_input
Type: Text
```

#### Text Node with Variables
```
Text: Hello {{name}}, your age is {{age}}
```
Variables are automatically created based on `{{variable}}` syntax.

#### LLM Node
```
System: You are a helpful assistant
User Prompt: Summarize the following: {{input}}
```

#### Math Node
```
Operation: add
Value A: 10
Value B: 5
```

#### HTTP Node
```
URL: https://api.example.com/data
Method: GET
Headers: {"Authorization": "Bearer token"}
```

## 🏗️ Project Structure

```
Ashish_Pundir_technical_assessment/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   └── __pycache__/
│
├── frontend/
│   ├── public/                 # Static files
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   │
│   ├── src/
│   │   ├── nodes/             # Node component definitions
│   │   │   ├── baseNode.js    # Base node template
│   │   │   ├── inputNode.js
│   │   │   ├── outputNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── textNode.js
│   │   │   ├── mathNode.js
│   │   │   ├── concatNode.js
│   │   │   ├── splitNode.js
│   │   │   ├── delayNode.js
│   │   │   ├── httpNode.js
│   │   │   └── uppercaseNode.js
│   │   │
│   │   ├── App.js             # Main application component
│   │   ├── ui.js              # ReactFlow canvas setup
│   │   ├── toolbar.js         # Top toolbar with actions
│   │   ├── draggableNode.js   # Draggable node components
│   │   ├── store.js           # Zustand state management
│   │   ├── submit.js          # Pipeline submission logic
│   │   ├── ThemeToggle.js     # Dark/Light theme toggle
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Global styles
│   │
│   ├── build/                 # Production build files
│   ├── .env                   # Environment variables
│   ├── package.json           # Node dependencies
│   └── README.md
│
└── README.md                  # This file
```

## 🔌 API Documentation

### Base URL
- **Local**: `http://localhost:8000`
- **Production**: `https://node-editor-7xgn.onrender.com`

### Endpoints

#### `GET /`
Health check endpoint

**Response:**
```json
{
  "Ping": "Pong"
}
```

#### `POST /pipelines/parse`
Parse and validate a pipeline structure

**Request Body:**
```json
{
  "nodes": [
    {
      "id": "1",
      "type": "input",
      "data": { "name": "input1" }
    }
  ],
  "edges": [
    {
      "source": "1",
      "target": "2"
    }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

### Interactive API Documentation

When the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| ReactFlow | 11.8.3 | Node-based editor library |
| Zustand | - | Lightweight state management |
| React Toastify | - | Toast notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | Latest | Python web framework |
| Uvicorn | Latest | ASGI server |
| Pydantic | Latest | Data validation |

## 🏗️ Building for Production

### Build Frontend

```bash
cd frontend

# Create production build
npm run build

# Build output will be in frontend/build/
```

### Serve Production Build Locally

```bash
# Install serve globally
npm install -g serve

# Serve the build folder
serve -s build -l 3000
```

### Deploy Backend

The backend can be deployed to:

- **Render** (current production deployment)
- **Heroku**
- **AWS Lambda/EC2**
- **Google Cloud Platform**
- **DigitalOcean**

**Important**: After deploying, update `REACT_APP_API_URL` in `frontend/.env` to match your backend URL.

## 🐛 Troubleshooting

### Issue: Backend won't start

**Error**: `ModuleNotFoundError: No module named 'fastapi'`

**Solution**:
```bash
cd backend
pip install -r requirements.txt
```

### Issue: Frontend can't connect to backend

**Error**: Network error or CORS issues

**Solution**:
1. Verify backend is running on `http://localhost:8000`
2. Check `frontend/.env` has correct `REACT_APP_API_URL`
3. Restart frontend after changing `.env`
4. Check browser console for detailed errors

### Issue: Port already in use

**Error**: `Address already in use`

**Solution**:
```bash
# Find process using port 8000
lsof -ti:8000

# Kill the process
kill -9 <PID>

# Or use a different port
uvicorn main:app --reload --port 8001
```

### Issue: npm install fails

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Python virtual environment issues

**Solution**:
```bash
# Deactivate current environment
deactivate

# Remove old environment
rm -rf venv

# Create fresh environment
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 💡 Development Tips

- **React DevTools**: Install the browser extension for debugging React components
- **API Documentation**: Access interactive API docs at `http://localhost:8000/docs`
- **Console Logging**: Check browser console for frontend errors and warnings
- **Theme Toggle**: Use the sun/moon icon to switch between light/dark themes
- **Hot Reload**: Both frontend and backend support hot reloading during development

## 🧪 Testing

### Test Backend API

```bash
# Using curl
curl http://localhost:8000/

# Using Python
python -c "import requests; print(requests.get('http://localhost:8000/').json())"
```

### Test Pipeline Submission

```bash
curl -X POST http://localhost:8000/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [{"id": "1", "type": "input"}],
    "edges": []
  }'
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Coding Standards

- Follow existing code style and formatting
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Ashish Pundir**
- GitHub: [@ashishpundir1997](https://github.com/ashishpundir1997)

## 🙏 Acknowledgments

- Built with [ReactFlow](https://reactflow.dev/)
- Backend powered by [FastAPI](https://fastapi.tiangolo.com/)
- Inspired by visual programming tools like Node-RED

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [API Documentation](#-api-documentation)
3. Open an issue on GitHub
4. Check existing issues for solutions

## 🗺️ Roadmap

Future enhancements planned:

- [ ] Execute pipelines and see real-time results
- [ ] Save and load pipeline configurations
- [ ] Export pipelines as JSON
- [ ] More node types (Database, API, Transform)
- [ ] Collaborative editing
- [ ] Pipeline templates library

---

**Built with ❤️ for the YC Technical Assessment**

**Happy Pipeline Building! 🚀**
