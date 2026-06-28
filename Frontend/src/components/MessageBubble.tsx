
import { Message } from '../store/chatStore';
import { useChatStore } from '../store/chatStore';
import { SourceCard } from './SourceCard';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { darkMode } = useChatStore();

  const isUser = message.sender === 'user';

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
            darkMode
              ? 'bg-gradient-to-br from-purple-600 to-pink-600'
              : 'bg-gradient-to-br from-blue-500 to-purple-600'
          }`}
        >
          AI
        </div>
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-xs lg:max-w-md`}>
        <div
          className={`px-4 py-3 rounded-lg ${
            isUser
              ? darkMode
                ? 'bg-blue-600 text-white'
                : 'bg-blue-500 text-white'
              : darkMode
              ? 'bg-slate-800 text-slate-100'
              : 'bg-slate-100 text-slate-900'
          }`}
        >
          <p className="break-words">{message.text}</p>
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 space-y-2">
            <p
              className={`text-xs font-semibold ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Sources:
            </p>
            <div className="space-y-1">
              {message.sources.map((source, idx) => (
                <SourceCard key={idx} source={source} />
              ))}
            </div>
          </div>
        )}

        <span
          className={`text-xs mt-2 ${
            darkMode ? 'text-slate-500' : 'text-slate-500'
          }`}
        >
          {message.timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      {isUser && (
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${
            darkMode
              ? 'bg-gradient-to-br from-green-600 to-teal-600'
              : 'bg-gradient-to-br from-green-500 to-teal-500'
          }`}
        >
          U
        </div>
      )}
    </div>
  );
};
