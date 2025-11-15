// uppercaseNode.js

import { GenericNode } from './GenericNode';

export const UppercaseNode = ({ id, data }) => {
  return (
    <GenericNode
      id={id}
      data={data}
      title="Uppercase"
      description="Convert text to uppercase"
      fields={[
        { type: 'checkbox', name: 'preserveNonAlpha', label: 'Preserve non-letters', default: true },
      ]}
      handles={[
        { type: 'target', position: 'Left', id: 'text' },
        { type: 'source', position: 'Right', id: 'text' },
      ]}
    />
  );
};
