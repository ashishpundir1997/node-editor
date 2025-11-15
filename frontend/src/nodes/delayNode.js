import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const DelayNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Delay"
      fields={[
        { key: 'milliseconds', label: 'ms', type: 'number', min: 0, max: 600000, step: 100, defaultValue: data?.milliseconds || 1000 }
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` },
        { type: 'source', position: Position.Right, id: `${id}-out` }
      ]}
    />
  );
};
