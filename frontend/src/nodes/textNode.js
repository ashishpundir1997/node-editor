// textNode.js

import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      fields={[
        { type: 'textarea', name: 'text', label: 'Text', default: '{{input}}' },
      ]}
      handles={[
        { type: 'source', position: 'Right', id: 'output' },
      ]}
    />
  );
}
