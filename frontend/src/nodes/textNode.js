// textNode.js

import { BaseNode } from './baseNode';

// Helper: parse variable placeholders like {{ varName }}
const extractVariables = (text = '') => {
  const regex = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }
  return Array.from(vars);
};

// Compute dynamic size from text content
const computeSize = (text = '') => {
  const lines = text.split(/\n/);
  const longest = lines.reduce((m, l) => Math.max(m, l.length), 0);
  // Width grows after base threshold (30 chars)
  const width = Math.min(600, 220 + Math.max(0, longest - 30) * 6);
  // Height: header (~32) + padding (20) + lines * lineHeight (20) + extra space for handles (variable count * 18)
  const lineHeight = 20;
  const textHeight = Math.max(60, lines.length * lineHeight);
  return { width, height: textHeight + 80 }; // 80 for header + spacing
};

export const TextNode = ({ id, data }) => {
  const textValue = data?.text || '{{input}}';
  const variableNames = extractVariables(textValue);
  const { width, height } = computeSize(textValue);

  // Position variable handles evenly beneath header area
  const handleStartY = 50; // below header
  const availableHeight = height - handleStartY - 40; // reserve bottom padding
  const step = variableNames.length > 0 ? availableHeight / (variableNames.length + 1) : 0;

  const variableHandles = variableNames.map((v, i) => ({
    type: 'target',
    position: 'Left',
    id: `var-${v}`,
    style: { top: handleStartY + step * (i + 1) },
  }));

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      description="Supports variables: {{name}}"
      fields={[
        { type: 'textarea', name: 'text', label: 'Text', default: '{{input}}' },
      ]}
      style={{ width, minHeight: height }}
      handles={[
        ...variableHandles,
        { type: 'source', position: 'Right', id: 'output', style: { top: height / 2 } },
      ]}
    />
  );
};
