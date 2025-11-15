// outputNode.js

import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      fields={[
        {
          type: 'text',
          name: 'outputName',
          label: 'Name',
          default: ({ id }) => id.replace('customOutput-', 'output_'),
        },
        {
          type: 'select',
          name: 'outputType',
          label: 'Type',
          options: ['Text', 'Image'],
          default: 'Text',
        },
      ]}
      handles={[
        { type: 'target', position: 'Left', id: 'value' },
      ]}
    />
  );
}
