// submit.js
// Submit button that sends the current pipeline (nodes + edges) to the backend
// and alerts the user with stats returned.

import { useCallback, useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
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
                alert(`Pipeline submit failed: ${res.status} ${res.statusText}\n${text}`);
                setLoading(false);
                return;
            }

            const data = await res.json();
            const isDagStr = data.is_dag ? 'Yes' : 'No';
            alert(`Pipeline parsed successfully:\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${isDagStr}`);
        } catch (err) {
            alert(`Network error submitting pipeline: ${err}`);
        } finally {
            setLoading(false);
        }
    }, [nodes, edges, loading]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
            <button type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Pipeline'}
            </button>
        </div>
    );
};
