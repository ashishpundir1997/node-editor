// inputNode.js

import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      fields={[
        {
          type: 'text',
          name: 'inputName',
          label: 'Name',
          default: ({ id }) => id.replace('customInput-', 'input_'),
        },
        {
          type: 'select',
          name: 'inputType',
          label: 'Type',
          options: ['Text', 'File'],
          default: 'Text',
        },
      ]}
      handles={[
        { type: 'source', position: 'Right', id: 'value' },
      ]}
    />
  );
}
