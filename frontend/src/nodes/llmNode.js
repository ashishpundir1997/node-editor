// llmNode.js

import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      description="Large Language Model"
      fields={[
        { type: 'textarea', name: 'system', label: 'System prompt', default: '' },
        { type: 'textarea', name: 'prompt', label: 'User prompt', default: '' },
      ]}
      style={{ minHeight: 180 }}
      handles={[
        { type: 'target', position: 'Left', id: 'system', style: { top: 70, zIndex: 2 } },
        { type: 'target', position: 'Left', id: 'prompt', style: { top: 130, zIndex: 2 } },
        { type: 'source', position: 'Right', id: 'response', style: { top: 100, zIndex: 2 } },
      ]}
    />
  );
}
