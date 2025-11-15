// toolbar.js

import { DraggableNode } from './draggableNode';
import { SubmitButton } from './submit';
import { ThemeToggle } from './ThemeToggle';

export const PipelineToolbar = () => {
        return (
            <header className="app-toolbar">
                <h1 style={{margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text)'}}>Pipeline Builder</h1>
                <div className="node-palette">
                    <DraggableNode type='customInput' label='Input' />
                    <DraggableNode type='llm' label='LLM' />
                    <DraggableNode type='customOutput' label='Output' />
                    <DraggableNode type='text' label='Text' />
                    <DraggableNode type='concat' label='Concat' />
                    <DraggableNode type='math' label='Math' />
                    <DraggableNode type='delay' label='Delay' />
                    <DraggableNode type='split' label='Split' />
                    <DraggableNode type='http' label='HTTP' />
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
                    <ThemeToggle />
                    <SubmitButton minimal />
                </div>
            </header>
        );
};
