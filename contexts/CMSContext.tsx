import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface CMSContextType {
  content: Record<string, string>;
  updateContent: (contentId: string, text: string) => Promise<void>;
  user: User | null;
}

const CMSContext = createContext<CMSContextType>({
  content: {},
  updateContent: async () => {},
  user: null,
});

export const useCMS = () => useContext(CMSContext);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const unsubscribeCMS = onSnapshot(
      collection(db, 'content'),
      (snapshot) => {
        const newContent: Record<string, string> = {};
        snapshot.forEach((doc) => {
          newContent[doc.id] = doc.data().text;
        });
        setContent(newContent);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'content');
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeCMS();
    };
  }, []);

  const updateContent = async (contentId: string, text: string) => {
    try {
      await setDoc(doc(db, 'content', contentId), { text }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `content/${contentId}`);
    }
  };

  return (
    <CMSContext.Provider value={{ content, updateContent, user }}>
      {children}
    </CMSContext.Provider>
  );
};
