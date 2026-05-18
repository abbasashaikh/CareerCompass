import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null); // { name, standard, stream, marks, budget, location }
  const [quizResults, setQuizResults] = useState(null); // { traits, topCareer, recommendations }
  const [chatHistory, setChatHistory] = useState([]);

  const updateUser = (data) => setUser(prev => ({ ...prev, ...data }));

  return (
    <AppContext.Provider value={{ user, setUser, updateUser, quizResults, setQuizResults, chatHistory, setChatHistory }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
