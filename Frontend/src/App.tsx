import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useChatStore } from './store/chatStore';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';

function App() {
  const { darkMode } = useChatStore();

  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`w-full h-screen ${darkMode ? 'dark' : ''}`}>
      <Navbar />
      <Sidebar />
      <ChatWindow />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: darkMode ? '#1e293b' : '#ffffff',
            color: darkMode ? '#f1f5f9' : '#0f172a',
            border: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}`,
          },
        }}
      />
    </div>
  );
}

export default App;
