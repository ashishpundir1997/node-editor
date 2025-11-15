import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      fields={[
        { key: 'label', label: 'Label', type: 'text', placeholder: 'Output label', defaultValue: data?.label || '' }
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` }
      ]}
    />
  );
};
