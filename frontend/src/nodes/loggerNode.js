import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const LoggerNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Logger"
      fields={[
        { key: 'level', label: 'Level', type: 'select', options: [ { value: 'info' }, { value: 'warn' }, { value: 'error' } ], defaultValue: data?.level || 'info' },
        { key: 'message', label: 'Message', type: 'textarea', rows: 2, placeholder: 'Log message', defaultValue: data?.message || '' }
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` },
        { type: 'source', position: Position.Right, id: `${id}-out` }
      ]}
    />
  );
};
