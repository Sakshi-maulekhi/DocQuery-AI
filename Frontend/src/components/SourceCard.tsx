
import { FileText } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

interface Source {
  filename: string;
  pages: number[];
}

interface SourceCardProps {
  source: Source;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source }) => {
  const { darkMode } = useChatStore();

  return (
    <div
      className={`px-3 py-2 rounded border flex items-start gap-2 ${
        darkMode
          ? 'bg-slate-700 border-slate-600 text-slate-200'
          : 'bg-slate-200 border-slate-300 text-slate-900'
      }`}
    >
      <FileText size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-xs font-medium truncate">{source.filename}</p>
        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Pages: {source.pages.join(', ')}
        </p>
      </div>
    </div>
  );
};
