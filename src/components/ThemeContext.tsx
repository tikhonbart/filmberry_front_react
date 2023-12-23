import React, { createContext, useState, useContext, FC, ReactNode } from 'react';

// Определение типа для контекста темы
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

// Создание контекста темы
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Тип для пропсов ThemeProvider
type ThemeProviderProps = {
  children: ReactNode;
};

// Компонент-обертка для предоставления темы всему приложению
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Состояние для темы

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    // Здесь можно также сохранять выбранную тему в localStorage или другом хранилище
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для использования значения темы в компонентах
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};