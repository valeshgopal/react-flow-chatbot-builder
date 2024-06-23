import Flow from './components/Flow';
import Header from './components/Header';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import './App.css';
import { useNode } from './context/node';
import { useStore } from './context/store';
import { shallow } from 'zustand/shallow';
import React from 'react';

// Define a selector function to select specific state and actions from the store
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

function App() {
  const { selectedNode } = useNode();
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow); // Use the selector to get state and actions from store with shallow comparison

  const [onSaveMessage, setOnSaveMessage] = React.useState(null);

  const handleSave = () => {
    const nodesWithEmptyTargets = nodes.filter((node) => {
      // Filter nodes to find those with empty target handles
      const hasEmptyTarget = !edges.some((edge) => edge.target === node.id);
      return hasEmptyTarget;
    });

    // Check if there are more than one node and more than one node has empty target handles
    if (nodes.length > 1 && nodesWithEmptyTargets.length > 1) {
      setOnSaveMessage({ type: 'error', message: 'Cannot save Flow' });
    } else {
      setOnSaveMessage({ type: 'succees', message: 'Flow saved successfully' });
    }
  };

  React.useEffect(() => {
    // clear the save message after 2 seconds
    if (onSaveMessage) {
      setTimeout(() => {
        setOnSaveMessage(null);
      }, 2000);
    }
  }, [onSaveMessage]);

  return (
    <div style={{ height: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <Header handleSave={handleSave} onSaveMessage={onSaveMessage} />
      <div style={{ display: 'flex' }}>
        <Flow
          nodes={nodes}
          edges={edges}
          getNodeID={getNodeID}
          addNode={addNode}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
        {/* Conditionally render SettingsPanel if a node is selected, otherwise render NodesPanel */}
        {selectedNode ? <SettingsPanel /> : <NodesPanel />}
      </div>
    </div>
  );
}

export default App;
