import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { PostContextProvider } from './Context/PostContext.jsx';
import { Toaster } from 'react-hot-toast';
import { TokenContextProvider } from './Context/tokenContext.jsx';

createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
    <PostContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
      <Toaster position="top-right" reverseOrder={false} />
    </PostContextProvider>
  </TokenContextProvider>
)
