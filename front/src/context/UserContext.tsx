import React, { createContext, useState, useEffect, ReactNode } from "react";

interface UserContextType {
  currentUser: string | null;
  favorites: string[];
  setCurrentUser: (user: string | null) => void;
  toggleFavorite: (id: string) => void;
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  favorites: [],
  setCurrentUser: () => {},
  toggleFavorite: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(
    localStorage.getItem("currentUser")
  );
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser) {
      const saved = localStorage.getItem(`favorites_${currentUser}`);
      setFavorites(saved ? JSON.parse(saved) : []);
    } else {
      setFavorites([]);
    }
  }, [currentUser]);

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(updated);
    if (currentUser) {
      localStorage.setItem(`favorites_${currentUser}`, JSON.stringify(updated));
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, favorites, setCurrentUser, toggleFavorite }}>
      {children}
    </UserContext.Provider>
  );
};
