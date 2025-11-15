// delayNode.js

import { BaseNode } from './baseNode';

export const DelayNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Delay"
      description="Delay passing the value"
      fields={[
        { type: 'number', name: 'ms', label: 'Milliseconds', default: 1000 },
      ]}
      handles={[
        { type: 'target', position: 'Left', id: 'in' },
        { type: 'source', position: 'Right', id: 'out' },
      ]}
    />
  );
};
