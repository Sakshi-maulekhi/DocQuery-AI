
import { FileText, Trash2 } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export const Sidebar: React.FC = () => {
  const { uploadedPDFs, removePDF, darkMode } = useChatStore();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 w-64 border-r overflow-y-auto ${
        darkMode
          ? 'bg-slate-950 border-slate-700'
          : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className="p-4">
        <h2
          className={`text-sm font-semibold mb-4 ${
            darkMode ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          Uploaded PDFs
        </h2>

        {uploadedPDFs.length === 0 ? (
          <p
            className={`text-sm ${
              darkMode ? 'text-slate-500' : 'text-slate-500'
            }`}
          >
            No PDFs uploaded yet
          </p>
        ) : (
          <div className="space-y-2">
            {uploadedPDFs.map((pdf) => (
              <div
                key={pdf.id}
                className={`p-3 rounded-lg border transition-colors ${
                  darkMode
                    ? 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                    : 'bg-white border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-start gap-2">
                  <FileText size={16} className="text-blue-500 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        darkMode ? 'text-slate-200' : 'text-slate-900'
                      }`}
                      title={pdf.name}
                    >
                      {pdf.name}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {formatFileSize(pdf.size)}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        darkMode ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      {formatDate(pdf.uploadedAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => removePDF(pdf.id)}
                    className={`p-1 rounded transition-colors flex-shrink-0 ${
                      darkMode
                        ? 'hover:bg-slate-600 text-slate-400'
                        : 'hover:bg-slate-200 text-slate-600'
                    }`}
                    aria-label="Delete PDF"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};
