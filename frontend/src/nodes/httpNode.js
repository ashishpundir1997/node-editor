// httpNode.js

import { BaseNode } from './baseNode';

export const HttpNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="HTTP"
      description="HTTP request"
      fields={[
        { type: 'text', name: 'url', label: 'URL', default: 'https://example.com' },
        { type: 'select', name: 'method', label: 'Method', options: ['GET', 'POST', 'PUT', 'DELETE'], default: 'GET' },
        { type: 'textarea', name: 'headers', label: 'Headers (JSON)', default: '' },
      ]}
      handles={[
        { type: 'target', position: 'Left', id: 'body' },
        { type: 'source', position: 'Right', id: 'status', style: { top: '55%' } },
        { type: 'source', position: 'Right', id: 'response', style: { top: '80%' } },
      ]}
    />
  );
};
