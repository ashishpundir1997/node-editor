// BaseNode.js

import React, { useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

// Small, consistent card styling for all nodes
const baseCardStyle = {
  width: 220,
  minHeight: 90,
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  background: 'var(--bg-alt)',
  boxShadow: 'var(--shadow-sm)',
  fontSize: 12,
  position: 'relative',
  overflow: 'visible',
};

const headerStyle = {
  padding: '6px 10px',
  background: 'var(--primary)',
  color: '#fff',
  borderTopLeftRadius: 'var(--radius)',
  borderTopRightRadius: 'var(--radius)',
  fontWeight: 600,
};

const bodyStyle = {
  padding: '8px 10px',
  display: 'grid',
  gap: 8,
};

// Maps a string to Position enum for convenience
const positionMap = {
  Left: Position.Left,
  Right: Position.Right,
  Top: Position.Top,
  Bottom: Position.Bottom,
};

// Field renderer
const Field = ({ id, nodeId, field, value, onChange }) => {
  const common = {
    id: `${nodeId}-${field.name}`,
    name: field.name,
    value: value ?? '',
    style: { width: '100%' },
  };

  // Auto-resize textarea
  if (field.type === 'textarea') {
    return (
      <label htmlFor={`${nodeId}-${field.name}`} style={{ display: 'grid', gap: 4 }}>
        <span style={{ color: 'var(--text)', fontSize: 12, fontWeight: 500 }}>{field.label}</span>
        <TextareaAutoResize
          {...common}
          onChange={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
            onChange(field.name, e.target.value);
          }}
        />
      </label>
    );
  }

  return (
    <label htmlFor={`${nodeId}-${field.name}`} style={{ display: 'grid', gap: 4 }}>
      <span style={{ color: 'var(--text)', fontSize: 12, fontWeight: 500 }}>{field.label}</span>
      {field.type === 'select' ? (
        <select {...common} onChange={(e) => onChange(field.name, e.target.value)}>
          {(field.options || []).map((opt) => (
            <option key={String(opt)} value={opt}>
              {String(opt)}
            </option>
          ))}
        </select>
      ) : field.type === 'number' ? (
        <input {...common} type="number" onChange={(e) => onChange(field.name, e.target.value)} />
      ) : field.type === 'checkbox' ? (
        <input id={`${nodeId}-${field.name}`} name={field.name} type="checkbox" checked={!!value} onChange={(e) => onChange(field.name, e.target.checked)} />
      ) : (
        <input {...common} type="text" onChange={(e) => onChange(field.name, e.target.value)} />
      )}
    </label>
  );
}

// Textarea component with auto-resize
function TextareaAutoResize(props) {
  const { value, ...rest } = props;
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, [value]);

  return <textarea ref={ref} rows={1} value={value} {...rest} />;
}

// Base node capable of rendering fields and handles from config
export const BaseNode = ({ id, data, title, description, fields = [], handles = [], style = {} }) => {
  const updateNodeField = useStore((s) => s.updateNodeField);

  // Initialize defaults once when missing
  useEffect(() => {
    fields.forEach((f) => {
      const hasVal = typeof data?.[f.name] !== 'undefined';
      if (!hasVal) {
        const def = typeof f.default === 'function' ? f.default({ id, data }) : f.default;
        if (typeof def !== 'undefined') {
          updateNodeField(id, f.name, def);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onFieldChange = (name, value) => {
    updateNodeField(id, name, value);
  };

  const defaultHandleStyle = {
  width: 12,
  height: 12,
  background: 'var(--primary)',
  border: '2px solid #fff',
  };

  return (
    <div style={{ ...baseCardStyle, ...style }}>
      <div style={headerStyle}>
        <span>{title}</span>
      </div>
      <div style={bodyStyle}>
        {description ? (
          <div style={{ color: 'var(--text-dim)', fontSize: 12 }}>{description}</div>
        ) : null}
        {fields.map((f) => (
          <Field key={f.name} id={id} nodeId={id} field={f} value={data?.[f.name]} onChange={onFieldChange} />
        ))}
      </div>

      {handles.map((h, idx) => (
        <Handle
          key={`${h.type}-${h.position}-${h.id}` || idx}
          type={h.type}
          position={positionMap[h.position]}
          id={`${id}-${h.id}`}
          style={{ ...defaultHandleStyle, ...(h.style || {}) }}
        />
      ))}
    </div>
  );
};
