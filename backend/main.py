from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Allow frontend (likely running on localhost:3000 or similar) to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    # Accept any extra fields the frontend sends (React Flow nodes have more)
    # Using Optional so partial objects don't break validation
    type: Optional[str] = None
    data: Optional[dict] = None
    position: Optional[dict] = None

class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    type: Optional[str] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    """Parse a pipeline sent from the frontend and return counts + DAG status.

    Returns
    -------
    {"num_nodes": int, "num_edges": int, "is_dag": bool}
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Build adjacency list & indegree map
    adjacency = {n.id: [] for n in pipeline.nodes}
    indegree = {n.id: 0 for n in pipeline.nodes}

    # Add edges; ignore edges referencing unknown nodes (could also auto-add)
    for e in pipeline.edges:
        if e.source in adjacency and e.target in adjacency:
            adjacency[e.source].append(e.target)
            indegree[e.target] += 1
        else:
            # If edge references missing nodes, treat as cycle risk; you could alternatively add them.
            pass

    # Kahn's algorithm for cycle detection
    from collections import deque
    queue = deque([node_id for node_id, deg in indegree.items() if deg == 0])
    visited_count = 0

    indegree_mut = indegree.copy()
    while queue:
        current = queue.popleft()
        visited_count += 1
        for neighbor in adjacency[current]:
            indegree_mut[neighbor] -= 1
            if indegree_mut[neighbor] == 0:
                queue.append(neighbor)

    is_dag = visited_count == len(adjacency)

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}
