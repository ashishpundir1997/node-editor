import { create } from 'zustand';
import { nanoid } from 'nanoid';

const generateId = (prefix) => `${prefix}-${nanoid(5)}`;

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => generateId(type),
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  onNodesChange: (changes) => set((state) => {
    const updated = state.nodes.map((n) => {
      const change = changes.find((c) => c.id === n.id);
      if (!change) return n;
      return { ...n, ...change }; // minimal
    });
    return { nodes: updated };
  }),
  onEdgesChange: (changes) => set((state) => ({ edges: state.edges })), // placeholder
  onConnect: (connection) => set((state) => ({ edges: [...state.edges, connection] })),
}));
