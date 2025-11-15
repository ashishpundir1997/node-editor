import { useState, useRef, useEffect, useCallback } from 'react';
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const defaultName = id.replace('customInput-', 'input_');

  // State for text, node height and width
  const [text, setText] = useState(data?.inputName || '');
  const [nodeHeight, setNodeHeight] = useState(140); // Increased minimum height for handle visibility
  const [nodeWidth, setNodeWidth] = useState(220);
  const textareaRef = useRef(null);

  // Extract variables from text (e.g., {{variableName}})
  const extractVariables = useCallback((inputText) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(inputText)) !== null) {
      const varName = match[1].trim();
      if (!matches.includes(varName)) {
        matches.push(varName);
      }
    }
    return matches;
  }, []);

  // Always extract variables from current text
  const variables = extractVariables(text);

  // ...existing code...

  // Auto-resize node height and width based on textarea content
  const resizeNode = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      const scrollHeight = el.scrollHeight;
      el.style.height = scrollHeight + 'px';

      // Always ensure enough height for handles, even for single variable
      const minHeight = 140 + (variables.length > 0 ? variables.length * 20 : 0);
      const newHeight = Math.max(minHeight, scrollHeight + 80);
      setNodeHeight(newHeight);

      // Calculate width based on text content
      const lines = el.value.split('\n');
      let maxLength = 0;
      lines.forEach(line => {
        maxLength = Math.max(maxLength, line.length);
      });
      const estimatedWidth = (maxLength * 7.5) + 64;
      const newWidth = Math.max(220, Math.min(600, estimatedWidth));
      setNodeWidth(newWidth);
    }
  };

  useEffect(() => {
    resizeNode();
  }, [text]);

  const handleDataChange = useCallback((key, value) => {
    if (key === 'inputName') {
      setText(value);
    }
  }, []);

  // Create target handles for each variable on the left side
  const handles = [
    ...variables.map((varName, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${varName}`,
      style: { top: `${(index + 1) * 20 + 40}px` },
    })),
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode
      id={id}
      data={{ ...data, inputName: text }}
      title="Input"
      onDataChange={handleDataChange}
      fields={[
        {
          key: 'inputName',
          label: 'Text',
          type: 'textarea',
          defaultValue: text,
          placeholder: 'Enter text... Use {{variableName}} for inputs',
          rows: 1,
          ref: textareaRef,
        },
      ]}
      handles={handles}
      containerStyle={{
        height: `${nodeHeight}px`,
        minHeight: '120px',
        width: `${nodeWidth}px`,
        minWidth: '220px',
        maxWidth: '600px',
        transition: 'height 0.2s ease, width 0.2s ease',
      }}
    />
  );
};