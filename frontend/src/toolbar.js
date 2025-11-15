// toolbar.js

import { DraggableNode } from './draggableNode';
import { 
  Type, 
  MessageSquare, 
  ArrowRightLeft, 
  Calculator, 
  Wifi, 
  Filter, 
  Clock, 
  FileText,
  Brain 
} from 'lucide-react';

export const PipelineToolbar = () => {
    const nodes = [
        { type: 'customInput', label: 'Input', icon: MessageSquare, color: '#3b82f6' },
        { type: 'llm', label: 'LLM', icon: Brain, color: '#8b5cf6' },
        { type: 'customOutput', label: 'Output', icon: ArrowRightLeft, color: '#10b981' },
        { type: 'text', label: 'Text', icon: Type, color: '#f59e0b' },
        { type: 'math', label: 'Math', icon: Calculator, color: '#ec4899' },
        { type: 'apiCall', label: 'API Call', icon: Wifi, color: '#06b6d4' },
        { type: 'filter', label: 'Filter', icon: Filter, color: '#84cc16' },
        { type: 'delay', label: 'Delay', icon: Clock, color: '#f97316' },
        { type: 'logger', label: 'Logger', icon: FileText, color: '#6366f1' },
    ];

    return (
        <div style={{ 
            padding: '16px 24px',
            background: 'hsl(210 40% 98%)',
            borderBottom: '1px solid hsl(214.3 31.8% 91.4%)',
            overflowX: 'auto',
        }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '8px',
                minWidth: 'max-content',
            }}>
                <span style={{ 
                    fontSize: '13px', 
                    fontWeight: '600', 
                    color: 'hsl(215.4 16.3% 46.9%)',
                    marginRight: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                }}>
                    Nodes
                </span>
                {nodes.map((node) => (
                    <DraggableNode 
                        key={node.type}
                        type={node.type} 
                        label={node.label} 
                        icon={node.icon}
                        color={node.color}
                    />
                ))}
            </div>
        </div>
    );
};
