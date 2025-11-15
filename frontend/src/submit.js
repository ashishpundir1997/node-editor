// submit.js
import { Send } from 'lucide-react';
import { useState } from 'react';
import { useStore } from './store';
import toast from 'react-hot-toast';

export const SubmitButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        setIsLoading(true);
        
        try {
            // Log the data being sent for debugging
            console.log('Sending pipeline data:', { nodes, edges });
            
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Backend response:', data);
            console.log('Edges being sent:', edges);
            
            // Display success toast with pipeline analysis
            toast.success(
                (t) => (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
                            Pipeline Analysis Complete 
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                                <span style={{ color: '#6b7280' }}>Number of Nodes:</span>
                                <span style={{ fontWeight: '600', color: '#3b82f6' }}>{data.num_nodes}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                                <span style={{ color: '#6b7280' }}>Number of Edges:</span>
                                <span style={{ fontWeight: '600', color: '#3b82f6' }}>{data.num_edges}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                                <span style={{ color: '#6b7280' }}>Is DAG:</span>
                                <span style={{ 
                                    fontWeight: '600', 
                                    color: data.is_dag ? '#10b981' : '#ef4444' 
                                }}>
                                    {data.is_dag ? 'Yes ✓' : 'No ✗'}
                                </span>
                            </div>
                        </div>
                    </div>
                ),
                {
                    duration: 5000,
                    style: {
                        background: '#ffffff',
                        color: '#0f172a',
                        border: '1px solid hsl(214.3 31.8% 91.4%)',
                        padding: '16px',
                        borderRadius: '8px',
                        minWidth: '300px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                }
            );
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            toast.error(
                `Failed to submit pipeline: ${error.message}`,
                {
                    duration: 4000,
                    style: {
                        background: '#ffffff',
                        color: '#0f172a',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        padding: '16px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                }
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button 
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: isLoading 
                    ? 'hsl(215 16.3% 46.9%)'
                    : isPressed 
                    ? 'hsl(221.2 83.2% 48%)'
                    : isHovered 
                    ? 'hsl(217.2 91.2% 59.8%)'
                    : 'hsl(221.2 83.2% 53.3%)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                transform: isPressed ? 'scale(0.95)' : isHovered ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isHovered 
                    ? '0 4px 12px hsla(221.2, 83.2%, 53.3%, 0.4)' 
                    : '0 2px 4px hsla(221.2, 83.2%, 53.3%, 0.2)',
                opacity: isLoading ? 0.7 : 1,
            }}
        >
            <Send size={16} className={isLoading ? 'animate-pulse' : ''} />
            <span>{isLoading ? 'Submitting...' : 'Submit Pipeline'}</span>
        </button>
    );
}
