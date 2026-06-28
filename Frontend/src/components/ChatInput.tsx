import { useState } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  disabled,
}) => {
  const [input, setInput] = useState('');
  const { darkMode, uploadedPDFs } = useChatStore();

  const handleSend = () => {
    if (input.trim() && !isLoading && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const placeholderText =
    uploadedPDFs.length === 0
      ? 'Upload a PDF first to start asking questions...'
      : 'Ask a question about your PDF... (Shift+Enter for new line)';

  return (
    <div
      className={`border-t ${
        darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
      }`}
    >
      <div className="p-4">
        <div
          className={`flex gap-3 p-3 rounded-lg border ${
            darkMode
              ? 'bg-slate-800 border-slate-700'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholderText}
            disabled={isLoading || disabled || uploadedPDFs.length === 0}
            className={`flex-1 bg-transparent outline-none resize-none max-h-24 ${
              darkMode
                ? 'text-white placeholder-slate-500'
                : 'text-slate-900 placeholder-slate-400'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            rows={1}
            style={{
              minHeight: '24px',
              maxHeight: '96px',
              lineHeight: '1.5',
              overflowY: input.split('\n').length > 4 ? 'auto' : 'hidden',
            }}
          />
          <button
            onClick={handleSend}
            disabled={
              !input.trim() ||
              isLoading ||
              disabled ||
              uploadedPDFs.length === 0
            }
            className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
              !input.trim() ||
              isLoading ||
              disabled ||
              uploadedPDFs.length === 0
                ? darkMode
                  ? 'bg-slate-700 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : darkMode
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
