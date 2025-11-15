from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm (topological sort) to detect cycles.
    """
    if not nodes:
        return True
    
    # Build adjacency list and in-degree count
    adj_list = defaultdict(list)
    in_degree = {}
    
    # Initialize all nodes with in-degree 0
    node_ids = set()
    for node in nodes:
        node_id = node.get('id')
        if node_id:
            node_ids.add(node_id)
            in_degree[node_id] = 0
    
    # Build the graph
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        
        # Only process edges where both source and target exist in nodes
        if source and target and source in node_ids and target in node_ids:
            adj_list[source].append(target)
            in_degree[target] += 1
    
    print(f"Node IDs: {node_ids}")
    print(f"Adjacency list: {dict(adj_list)}")
    print(f"In-degree: {in_degree}")
    
    # Find all nodes with in-degree 0
    queue = deque([node_id for node_id in in_degree if in_degree[node_id] == 0])
    visited_count = 0
    
    print(f"Starting queue (nodes with in-degree 0): {list(queue)}")
    
    # Process nodes with in-degree 0
    while queue:
        node = queue.popleft()
        visited_count += 1
        
        # Reduce in-degree for neighbors
        for neighbor in adj_list[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    print(f"Visited count: {visited_count}, Total nodes: {len(node_ids)}")
    
    # If all nodes are visited, it's a DAG
    # If visited_count < total nodes, there's a cycle
    return visited_count == len(node_ids)

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    """
    Parse the pipeline and return the number of nodes, edges, and whether it's a DAG.
    """
    print(f"Received nodes: {pipeline.nodes}")
    print(f"Received edges: {pipeline.edges}")
    
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    print(f"DAG result: {is_dag_result}")
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }
