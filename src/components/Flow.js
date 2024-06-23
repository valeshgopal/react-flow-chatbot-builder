import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import { TextNode } from './TextNode';
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
    text: TextNode,
};

const Flow = ({
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
}) => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const getInitNodeData = (nodeID, type) => {
        let nodeData = { id: nodeID, nodeType: `${type}` };
        return nodeData;
    };

    // function to handle drop event
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            if (event?.dataTransfer?.getData('application/reactflow')) {
                const appData = JSON.parse(
                    event.dataTransfer.getData('application/reactflow')
                );
                const type = appData?.nodeType;

                // check if the dropped element is valid
                if (typeof type === 'undefined' || !type) {
                    return;
                }

                // Calculate position of the dropped node
                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                // Generate a unique node ID and create the new node
                const nodeID = getNodeID(type);
                const newNode = {
                    id: nodeID,
                    type,
                    position,
                    data: getInitNodeData(nodeID, type),
                };

                // Add the new node to the state
                addNode(newNode);
            }
        },
        [reactFlowInstance]
    );

    //function to handle drag over event on node
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
            <div
                ref={reactFlowWrapper}
                style={{
                    flexBasis: '75vw',
                    height: '100vh',
                    borderRight: '1px solid rgba(0,0,0,0.2)',
                }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onInit={setReactFlowInstance}
                    nodeTypes={nodeTypes}
                    proOptions={proOptions}
                    snapGrid={[gridSize, gridSize]}
                >
                    <Background color='#ccc' gap={gridSize} />
                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
};

export default Flow;
