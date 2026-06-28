import { useEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { MessageBubble } from './MessageBubble';
import { Loader } from './Loader';
import { UploadCard } from './UploadCard';
import { ChatInput } from './ChatInput';
import toast from 'react-hot-toast';
import axios from 'axios';

export const ChatWindow: React.FC = () => {
  const {
    messages,
    addMessage,
    clearMessages,
    isLoading,
    setIsLoading,
    darkMode,
    uploadedPDFs,
  } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setIsLoading(true);

    try {
      // Simulated API call
      const response = await axios.post(
  "http://127.0.0.1:8000/chat",
  {
    question: message,
  },
  {
    timeout: 120000,
  }
);

      // Simulated delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text:
          response.data.answer ||
          `This is a placeholder response to: "${message}". In a real application, this would be powered by an AI model analyzing your PDF.`,
        sender: 'ai' as const,
        timestamp: new Date(),
        sources: response.data.sources || [
          {
            filename: uploadedPDFs[0]?.name || 'document.pdf',
            pages: [1, 2],
          },
        ],
      };

      addMessage(aiMessage);
    } catch (error) {
      console.error('Chat error:', error);

      // Add a simulated AI response for demo purposes
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: `This is a placeholder response to: "${message}". In a real application, this would be powered by an AI model analyzing your PDF and providing accurate, sourced answers.`,
        sender: 'ai' as const,
        timestamp: new Date(),
        sources:
          uploadedPDFs.length > 0
            ? [
                {
                  filename: uploadedPDFs[0].name,
                  pages: [1, 2, 3],
                },
              ]
            : [],
      };

      addMessage(aiMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    clearMessages();
    toast.success('Chat cleared');
  };

  return (
    <div
      className={`flex flex-col h-screen pt-16 pl-0 lg:pl-64 ${
        darkMode ? 'bg-slate-900' : 'bg-white'
      }`}
    >
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  P
                </div>
                <h2
                  className={`text-3xl font-bold mb-2 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Welcome to PDF AI Assistant
                </h2>
                <p
                  className={`text-lg ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Upload a PDF and start asking questions
                </p>
              </div>

              <div className="w-full max-w-md">
                <UploadCard />
              </div>

              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 w-full ${
                  uploadedPDFs.length === 0 ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <div
                  className={`p-4 rounded-lg border ${
                    darkMode
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <p
                    className={`text-sm font-semibold mb-2 ${
                      darkMode ? 'text-slate-200' : 'text-slate-900'
                    }`}
                  >
                    💡 Tip
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Ask specific questions about your PDF content for accurate answers.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-lg border ${
                    darkMode
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <p
                    className={`text-sm font-semibold mb-2 ${
                      darkMode ? 'text-slate-200' : 'text-slate-900'
                    }`}
                  >
                    📎 Sources
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Each answer shows the source document and page numbers.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2
                  className={`text-lg font-semibold ${
                    darkMode ? 'text-slate-200' : 'text-slate-900'
                  }`}
                >
                  Conversation
                </h2>
                <button
                  onClick={handleClearChat}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    darkMode
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <RotateCcw size={16} />
                  Clear Chat
                </button>
              </div>

              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className={`p-4 rounded-lg ${
                      darkMode ? 'bg-slate-800' : 'bg-slate-100'
                    }`}
                  >
                    <Loader />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        disabled={uploadedPDFs.length === 0}
      />
    </div>
  );
};
