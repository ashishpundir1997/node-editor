import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const APICallNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="API Call"
      fields={[
        { key: 'method', label: 'Method', type: 'select', options: [ { value: 'GET' }, { value: 'POST' }, { value: 'PUT' }, { value: 'DELETE' } ], defaultValue: data?.method || 'GET' },
        { key: 'url', label: 'URL', type: 'text', placeholder: 'https://api...', defaultValue: data?.url || '' },
        { key: 'body', label: 'Body', type: 'textarea', rows: 2, placeholder: '{ "key": "value" }', defaultValue: data?.body || '' }
      ]}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` },
        { type: 'source', position: Position.Right, id: `${id}-out` }
      ]}
    />
  );
};
