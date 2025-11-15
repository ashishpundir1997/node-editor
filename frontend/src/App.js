import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'hsl(0 0% 100%)',
    }}>
      {/* Toast Notifications */}
      <Toaster position="top-right" />
      
      {/* Header */}
      <header style={{
        background: 'hsl(0 0% 100%)',
        borderBottom: '1px solid hsl(214.3 31.8% 91.4%)',
        padding: '16px 24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, hsl(221.2 83.2% 53.3%) 0%, hsl(217.2 91.2% 59.8%) 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px hsla(221.2, 83.2%, 53.3%, 0.25)',
            }}>
              <span style={{ fontSize: '20px' }}>⚡</span>
            </div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, hsl(221.2 83.2% 53.3%) 0%, hsl(217.2 91.2% 59.8%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
            }}>
              Workflow Builder
            </h1>
          </div>
          <SubmitButton />
        </div>
      </header>

      {/* Toolbar */}
      <PipelineToolbar />

      {/* Main Canvas */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
