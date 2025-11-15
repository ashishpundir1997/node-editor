// concatNode.js

import { BaseNode } from './baseNode';

export const ConcatNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Concat"
      description="Concatenate two strings with a separator"
      fields={[
        { type: 'text', name: 'separator', label: 'Separator', default: ' ' },
      ]}
      handles={[
        { type: 'target', position: 'Left', id: 'a', style: { top: '35%' } },
        { type: 'target', position: 'Left', id: 'b', style: { top: '65%' } },
        { type: 'source', position: 'Right', id: 'out' },
      ]}
    />
  );
};
