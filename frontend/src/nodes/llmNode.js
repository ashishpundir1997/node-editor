import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      fields={[
        { key: 'model', label: 'Model', type: 'select', options: [
          { value: 'gpt-4' }, { value: 'gpt-4o-mini' }, { value: 'gpt-3.5-turbo' }
        ], defaultValue: data?.model || 'gpt-4' },
        { key: 'temperature', label: 'Temp', type: 'number', min: 0, max: 2, step: 0.1, defaultValue: data?.temperature || 0.7 },
        { key: 'prompt', label: 'Prompt', type: 'textarea', rows: 3, placeholder: 'Enter prompt with {{variables}}', defaultValue: data?.prompt || '' }
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` },
        { type: 'source', position: Position.Right, id: `${id}-out` }
      ]}
    />
  );
};
