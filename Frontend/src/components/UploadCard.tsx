import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import toast from 'react-hot-toast';
import axios from 'axios';
//const API_URL = (import.meta as any).env?.VITE_API_URL;

export const UploadCard: React.FC = () => {
  const { darkMode, addPDF } = useChatStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const uploadPDF = async (files: FileList) => {
    if (files.length === 0) return;

    const file = files[0];

    if (!file.name.endsWith('.pdf')) {
      toast.error('Please upload a PDF file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size must be less than 50MB');
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading('Uploading PDF...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulated API call
      await axios.post(
  'http://127.0.0.1:8000/upload-pdf',
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
);

      const newPDF = {
        id: Date.now().toString(),
        name: file.name,
        uploadedAt: new Date(),
        size: file.size,
      };

      addPDF(newPDF);
      toast.success('PDF uploaded successfully', { id: toastId });
    } catch (error) {
      toast.error('Failed to upload PDF', { id: toastId });
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    uploadPDF(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadPDF(e.target.files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`p-6 rounded-lg border-2 border-dashed transition-colors ${
        isDragging
          ? darkMode
            ? 'bg-blue-950 border-blue-500'
            : 'bg-blue-50 border-blue-400'
          : darkMode
          ? 'bg-slate-800 border-slate-600'
          : 'bg-slate-50 border-slate-300'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-3">
        <div
          className={`p-3 rounded-lg ${
            darkMode ? 'bg-slate-700' : 'bg-slate-200'
          }`}
        >
          <Upload
            size={24}
            className={isDragging ? 'text-blue-500' : 'text-slate-600'}
          />
        </div>
        <div className="text-center">
          <p
            className={`font-semibold ${
              darkMode ? 'text-slate-200' : 'text-slate-900'
            }`}
          >
            Drag and drop your PDF here
          </p>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            or
          </p>
        </div>
        <button
          onClick={handleBrowseClick}
          disabled={isUploading}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isUploading
              ? darkMode
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : darkMode
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Browse Files'}
        </button>
        <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
          PDF files up to 50MB
        </p>
      </div>
    </div>
  );
};
