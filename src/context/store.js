import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],

    // Function to get a unique ID for a new node of a specific type
    getNodeID: (type) => {
        const newIDs = { ...get().nodeIDs };
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({ nodeIDs: newIDs });
        return `${type}-${newIDs[type]}`;
    },

    // Function to add a new node to the state
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },

    // Function to handle node changes (e.g., position, data updates)
    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    // Function to handle edge changes (e.g., adding, removing, updating edges)
    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    // Function to handle new connections between nodes
    onConnect: (connection) => {
        set({
            edges: addEdge({ ...connection, markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' } }, get().edges),
        });
    },
}));