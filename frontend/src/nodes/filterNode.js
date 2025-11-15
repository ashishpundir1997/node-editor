import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      fields={[
        { key: 'expression', label: 'Expression', type: 'text', placeholder: 'e.g. value > 10', defaultValue: data?.expression || '' }
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` },
        { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '40%' } },
        { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '70%' } }
      ]}
    />
  );
};
