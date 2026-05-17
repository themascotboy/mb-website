import React, { useState, useEffect, useRef } from 'react';
import { useCMS } from '../contexts/CMSContext';
import { Edit2, Check, X } from 'lucide-react';

interface EditableTextProps {
  contentId: string;
  defaultText: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  className?: string;
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  contentId, 
  defaultText, 
  as: Component = 'span', 
  className = '',
  multiline = false
}) => {
  const { content, updateContent, user } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState('');
  
  const currentText = content[contentId] !== undefined ? content[contentId] : defaultText;
  
  // If we're passing React nodes as defaultText and it's not overridden by CMS yet
  const displayContent = typeof currentText === 'string' ? currentText : defaultText;

  useEffect(() => {
    if (isEditing) {
      setDraftText(typeof currentText === 'string' ? currentText : '');
    }
  }, [isEditing, currentText]);

  const handleSave = async () => {
    await updateContent(contentId, draftText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing && user) {
    return (
      <div className={`relative inline-block w-full z-50 ${className}`}>
        {multiline ? (
          <textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            className="w-full bg-white text-mascot-black border-2 border-mascot-yellow p-2 rounded-lg outline-none min-h-[100px] text-lg font-sans"
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            className="w-full bg-white text-mascot-black border-2 border-mascot-yellow p-2 rounded-lg outline-none font-sans"
            autoFocus
          />
        )}
        <div className="absolute -bottom-10 right-0 flex gap-2 bg-white p-1 rounded-lg shadow-elevated">
          <button onClick={handleSave} className="p-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            <Check size={16} />
          </button>
          <button onClick={handleCancel} className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group inline-block ${className}`}>
      <Component>{displayContent}</Component>
      {user && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(true);
          }}
          className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 bg-mascot-yellow text-mascot-black p-1.5 rounded-full shadow-subtle hover:scale-110 transition-all z-10 block"
        >
          <Edit2 size={12} />
        </button>
      )}
    </div>
  );
};
