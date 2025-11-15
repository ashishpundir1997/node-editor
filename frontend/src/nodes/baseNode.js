// baseNode.js
// Reusable base component for all React Flow nodes

import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * BaseNode - A reusable component for creating React Flow nodes
 * 
 * @param {string} id - Node ID from React Flow
 * @param {object} data - Node data from React Flow
 * @param {string} title - Title displayed in the node header
 * @param {array} fields - Array of field configurations
 *   Each field: { key, label, type: 'text'|'select'|'number', options?: [], defaultValue?, placeholder? }
 * @param {array} handles - Array of handle configurations
 *   Each handle: { type: 'source'|'target', position: Position, id, style?, label? }
 * @param {object} containerStyle - Optional custom container styles
 * @param {function} onDataChange - Optional callback when field values change
 */
export const BaseNode = ({ 
  id, 
  data, 
  title, 
  fields = [], 
  handles = [],
  containerStyle = {},
  onDataChange
}) => {
  // Initialize state for all fields from data or defaults
  const [fieldValues, setFieldValues] = useState(() => {
    const initial = {};
    fields.forEach(field => {
      initial[field.key] = data?.[field.key] ?? field.defaultValue ?? '';
    });
    return initial;
  });

  // Update state when data prop changes (e.g., from external updates)
  useEffect(() => {
    if (data) {
      const updated = {};
      fields.forEach(field => {
        if (data[field.key] !== undefined) {
          updated[field.key] = data[field.key];
        }
      });
      if (Object.keys(updated).length > 0) {
        setFieldValues(prev => ({ ...prev, ...updated }));
      }
    }
  }, [data, fields]);

  // Handle field value changes
  const handleFieldChange = (key, value) => {
    setFieldValues(prev => {
      const updated = { ...prev, [key]: value };
      // Defer onDataChange callback to avoid setState during render
      if (onDataChange) {
        // Use setTimeout to defer the callback to next tick
        setTimeout(() => {
          onDataChange(key, value, updated);
        }, 0);
      }
      return updated;
    });
  };

  // Calculate field height based on type
  const getFieldHeight = (field) => {
    const labelHeight = 18; // Label height
    const fieldGap = 4; // Gap between label and input
    
    switch (field.type) {
      case 'textarea':
        const rows = field.rows || 2;
        const lineHeight = 20; // Approximate line height
        const textareaPadding = 12; // Top and bottom padding
        return labelHeight + fieldGap + (rows * lineHeight) + textareaPadding;
      case 'select':
      case 'number':
      case 'text':
      default:
        const inputHeight = 32; // Input height (padding + border)
        return labelHeight + fieldGap + inputHeight;
    }
  };

  // Render a field based on its type
  const renderField = (field) => {
    const value = fieldValues[field.key] ?? '';
    
    switch (field.type) {
      case 'select':
        return (
          <label key={field.key} style={styles.fieldContainer}>
            <span style={styles.fieldLabel}>{field.label}:</span>
            <select
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              style={styles.select}
              onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
              onBlur={(e) => e.target.style.borderColor = '#475569'}
            >
              {field.options?.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label || opt.value}
                </option>
              ))}
            </select>
          </label>
        );
      
      case 'number':
        return (
          <label key={field.key} style={styles.fieldContainer}>
            <span style={styles.fieldLabel}>{field.label}:</span>
            <input
              type="number"
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              style={styles.input}
              min={field.min}
              max={field.max}
              step={field.step}
              onFocus={(e) => e.target.style.borderColor = 'hsl(221.2 83.2% 53.3%)'}
              onBlur={(e) => e.target.style.borderColor = 'hsl(214.3 31.8% 91.4%)'}
            />
          </label>
        );
      
      case 'textarea':
        return (
          <label key={field.key} style={styles.fieldContainer}>
            <span style={styles.fieldLabel}>{field.label}:</span>
            <textarea
              ref={field.ref}
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              style={styles.textarea}
              rows={field.rows || 2}
              onFocus={(e) => e.target.style.borderColor = 'hsl(221.2 83.2% 53.3%)'}
              onBlur={(e) => e.target.style.borderColor = 'hsl(214.3 31.8% 91.4%)'}
            />
          </label>
        );
      
      case 'text':
      default:
        return (
          <label key={field.key} style={styles.fieldContainer}>
            <span style={styles.fieldLabel}>{field.label}:</span>
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = 'hsl(221.2 83.2% 53.3%)'}
              onBlur={(e) => e.target.style.borderColor = 'hsl(214.3 31.8% 91.4%)'}
            />
          </label>
        );
    }
  };

  // Calculate dynamic height based on actual field heights
  const headerHeight = 40; // Header with padding
  const contentPadding = 24; // Top and bottom padding (12px each)
  const fieldGap = 8; // Gap between fields
  const totalFieldGaps = fields.length > 0 ? (fields.length - 1) * fieldGap : 0;
  const totalFieldsHeight = fields.reduce((sum, field) => sum + getFieldHeight(field), 0);
  const emptyContentHeight = fields.length === 0 ? 40 : 0;
  
  const dynamicHeight = Math.max(
    120, // Minimum height
    headerHeight + contentPadding + totalFieldsHeight + totalFieldGaps + emptyContentHeight
  );
  
  const containerStyles = {
    ...styles.container,
    height: dynamicHeight,
    overflow: 'hidden', // Prevent content from going outside
    ...containerStyle
  };

  return (
    <div style={containerStyles}>
      {/* Render target handles (left side) */}
      {handles
        .filter(handle => handle.type === 'target')
        .map((handle, idx) => (
          <Handle
            key={`target-${handle.id || idx}`}
            type="target"
            position={handle.position || Position.Left}
            id={handle.id || `${id}-target-${idx}`}
            style={{
              ...styles.handle,
              ...(handle.style || {}),
              ...(handle.top !== undefined ? { top: `${handle.top}%` } : {})
            }}
          />
        ))}

      {/* Node Header */}
      <div style={styles.header}>
        <span style={styles.title}>{title}</span>
      </div>

      {/* Node Content/Fields */}
      <div style={styles.content}>
        {fields.length > 0 ? (
          fields.map(renderField)
        ) : (
          <div style={styles.emptyContent}>
            {data?.description || 'No configuration needed'}
          </div>
        )}
      </div>

      {/* Render source handles (right side) */}
      {handles
        .filter(handle => handle.type === 'source')
        .map((handle, idx) => (
          <Handle
            key={`source-${handle.id || idx}`}
            type="source"
            position={handle.position || Position.Right}
            id={handle.id || `${id}-source-${idx}`}
            style={{
              ...styles.handle,
              ...(handle.style || {}),
              ...(handle.top !== undefined ? { top: `${handle.top}%` } : {})
            }}
          />
        ))}
    </div>
  );
};

// Shared styles for consistent appearance
const styles = {
  container: {
    width: 220,
    minHeight: 100,
    border: '2px solid hsl(221.2 83.2% 53.3%)',
    borderRadius: '12px',
    backgroundColor: 'hsl(0 0% 100%)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    transition: 'box-shadow 0.3s ease, transform 0.2s ease',
  },
  header: {
    padding: '12px 14px',
    background: 'linear-gradient(135deg, hsl(221.2 83.2% 53.3%) 0%, hsl(217.2 91.2% 59.8%) 100%)',
    color: '#fff',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    fontWeight: '600',
    fontSize: '13px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  title: {
    display: 'block',
  },
  content: {
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
    overflow: 'hidden', // Prevent overflow
    minHeight: 0,
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    fontSize: '12px',
  },
  fieldLabel: {
    fontWeight: '600',
    color: 'hsl(215.4 16.3% 46.9%)',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '8px 10px',
    border: '1px solid hsl(214.3 31.8% 91.4%)',
    borderRadius: '6px',
    fontSize: '12px',
    outline: 'none',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
    boxSizing: 'border-box',
    width: '100%',
    height: '32px',
    background: 'hsl(0 0% 100%)',
    color: 'hsl(222.2 47.4% 11.2%)',
  },
  select: {
    padding: '8px 10px',
    border: '1px solid hsl(214.3 31.8% 91.4%)',
    borderRadius: '6px',
    fontSize: '12px',
    outline: 'none',
    backgroundColor: 'hsl(0 0% 100%)',
    color: 'hsl(222.2 47.4% 11.2%)',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
    boxSizing: 'border-box',
    width: '100%',
    height: '32px', 
  },
  textarea: {
    padding: '8px 10px',
    border: '1px solid hsl(214.3 31.8% 91.4%)',
    borderRadius: '6px',
    fontSize: '12px',
    outline: 'none',
    resize: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '32px',
    overflow: 'hidden',
    background: 'hsl(0 0% 100%)',
    color: 'hsl(222.2 47.4% 11.2%)',
  },
  handle: {
    width: '12px',
    height: '12px',
    backgroundColor: 'hsl(221.2 83.2% 53.3%)',
    border: '2px solid #fff',
    borderRadius: '50%',
  },
  emptyContent: {
    fontSize: '12px',
    color: 'hsl(215.4 16.3% 46.9%)',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '8px 0',
  },
};

