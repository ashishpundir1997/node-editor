// draggableNode.js

// Icon mapping for different node types
const nodeIcons = {
  'customInput': '📥',
  'llm': '🤖',
  'customOutput': '📤',
  'text': '📝',
  'concat': '🔗',
  'math': '🔢',
  'delay': '⏱️',
  'split': '✂️',
  'http': '🌐',
  'uppercase': '🔠'
};

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const icon = nodeIcons[type] || '⚙️';

  return (
    <div
      className={`palette-item ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      title={`Drag to canvas: ${label}`}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        <span style={{ fontSize: '0.9em' }}>{icon}</span>
        <span>{label}</span>
      </span>
    </div>
  );
};
  