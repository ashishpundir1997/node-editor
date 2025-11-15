// splitNode.js

import { BaseNode } from './baseNode';

export const SplitNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Split"
      description="Split text by a separator"
      fields={[
        { type: 'text', name: 'separator', label: 'Separator', default: ',' },
      ]}
      handles={[
        { type: 'target', position: 'Left', id: 'text' },
        { type: 'source', position: 'Right', id: 'first', style: { top: '55%' } },
        { type: 'source', position: 'Right', id: 'rest', style: { top: '80%' } },
      ]}
    />
  );
};
