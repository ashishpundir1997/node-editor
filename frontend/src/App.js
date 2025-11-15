import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app-shell">
      <PipelineToolbar />
      <PipelineUI />
      <ToastContainer position="bottom-right" autoClose={4000} newestOnTop closeOnClick pauseOnFocusLoss={false} theme="light" />
    </div>
  );
}

export default App;
