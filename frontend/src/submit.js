// submit.js
// Submit button that sends the current pipeline (nodes + edges) to the backend
// and alerts the user with stats returned.

import { useCallback, useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { toast } from 'react-toastify';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = ({ minimal = false }) => {
    const { nodes, edges } = useStore(selector, shallow);
    const [loading, setLoading] = useState(false);

    const handleSubmit = useCallback(async () => {
        if (loading) return; // prevent double clicks
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nodes, edges })
            });

                    if (!res.ok) {
                        const text = await res.text();
                        toast.error(`Submit failed (${res.status}): ${text || res.statusText}`);
                        setLoading(false);
                        return;
                    }

                    const data = await res.json();
                    const isDagStr = data.is_dag ? 'DAG ✓' : 'Cycle detected ✕';
                    toast.success(`Pipeline parsed: ${data.num_nodes} nodes · ${data.num_edges} edges · ${isDagStr}`);
        } catch (err) {
                    toast.error(`Network error: ${err}`);
        } finally {
            setLoading(false);
        }
    }, [nodes, edges, loading]);

            if (minimal) {
                return (
                    <button className="submit-btn" style={{padding: '.55rem .9rem'}} type="button" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Submitting…' : 'Submit'}
                    </button>
                );
            }
            return (
                <div className="submit-wrapper">
                    <button className="submit-btn" type="button" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Submitting…' : 'Submit Pipeline'}
                    </button>
                </div>
            );
};
