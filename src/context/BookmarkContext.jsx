import React, { createContext, useContext, useState, useEffect } from "react";

const BookmarkContext = createContext();

export const useBookmarks = () => {
  return useContext(BookmarkContext);
};

export const BookmarkProvider = ({ children }) => {
  const [savedInternships, setSavedInternships] = useState(() => {
    const localData = localStorage.getItem('savedInternships');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('savedInternships', JSON.stringify(savedInternships));
  }, [savedInternships]);

  const toggleBookmark = (id) => {
    setSavedInternships(prev => 
      prev.includes(id) ? prev.filter(bookmarkId => bookmarkId !== id) : [...prev, id]
    );
  };

  return (
    <BookmarkContext.Provider value={{ savedInternships, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
