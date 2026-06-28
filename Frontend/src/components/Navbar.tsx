
import { Moon, Sun } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useChatStore();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b ${
        darkMode
          ? 'bg-slate-900 border-slate-700 text-white'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            P
          </div>
          <h1 className="text-xl font-bold">PDF AI Assistant</h1>
        </div>

        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-colors ${
            darkMode
              ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};
