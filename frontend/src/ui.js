// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { APICallNode } from './nodes/apiCallNode';
import { FilterNode } from './nodes/filterNode';
import { DelayNode } from './nodes/delayNode';
import { LoggerNode } from './nodes/loggerNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  apiCall: APICallNode,
  filter: FilterNode,
  delay: DelayNode,
  logger: LoggerNode,

};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{
            width: '100%', 
            height: '100%',
            background: 'hsl(210 40% 98%)',
        }}>
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
                connectionLineType='smoothstep'
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                    style: { stroke: 'hsl(221.2 83.2% 53.3%)', strokeWidth: 2 },
                }}
            >
                <Background 
                    color="hsl(215 20.2% 85.1%)" 
                    gap={gridSize} 
                    style={{ background: 'hsl(0 0% 100%)' }}
                />
                <Controls />
                <MiniMap 
                    nodeColor={(node) => {
                        const colors = {
                            customInput: '#3b82f6',
                            llm: '#8b5cf6',
                            customOutput: '#10b981',
                            text: '#f59e0b',
                            math: '#ec4899',
                            apiCall: '#06b6d4',
                            filter: '#84cc16',
                            delay: '#f97316',
                            logger: '#6366f1',
                        };
                        return colors[node.type] || '#64748b';
                    }}
                    style={{
                        background: 'hsl(0 0% 100%)',
                        border: '1px solid hsl(214.3 31.8% 91.4%)',
                    }}
                    maskColor="rgba(0, 0, 0, 0.05)"
                />
            </ReactFlow>
        </div>
        </>
    )
}
