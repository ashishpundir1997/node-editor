import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      fields={[
        { key: 'name', label: 'Name', type: 'text', placeholder: 'variable name', defaultValue: data?.name || '' },
        { key: 'value', label: 'Value', type: 'textarea', placeholder: 'Enter value', rows: 2, defaultValue: data?.value || '' },
      ]}
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-out` }
      ]}
    />
  );
};
