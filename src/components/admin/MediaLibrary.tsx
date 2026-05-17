import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { Upload, Copy, CheckCircle2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '../Button';

export const MediaLibrary = () => {
  const [files, setFiles] = useState<{name: string, url: string}[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const listRef = ref(storage, 'uploads/');
      const res = await listAll(listRef);
      const fileData = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        })
      );
      setFiles(fileData);
    } catch (error) {
      console.error("Error loading files:", error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
        setUploading(false);
      },
      async () => {
        setUploading(false);
        setUploadProgress(0);
        loadFiles();
      }
    );
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h3 className="text-xl font-bold font-display uppercase">Media Library</h3>
          <p className="text-sm text-gray-500">Upload and manage images</p>
        </div>
        <div>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <Button 
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={uploading}
            className="flex items-center gap-2"
          >
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
            {uploading ? `Uploading ${Math.round(uploadProgress)}%` : 'Upload Image'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.length === 0 && !uploading && (
           <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
             <ImageIcon className="mx-auto mb-2 opacity-50" size={32} />
             <p>No images uploaded yet</p>
           </div>
        )}
        {files.map((file, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="h-32 bg-gray-100 relative group">
              <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleCopy(file.url)}
                  className="bg-white text-mascot-black p-2 rounded-lg flex items-center gap-2 hover:bg-mascot-yellow transition-colors font-bold text-sm"
                >
                  {copiedUrl === file.url ? <CheckCircle2 size={16}/> : <Copy size={16}/>}
                  {copiedUrl === file.url ? 'Copied!' : 'Copy URL'}
                </button>
              </div>
            </div>
            <div className="p-3 truncate text-xs font-medium text-gray-500">
              {file.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
