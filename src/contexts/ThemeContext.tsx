import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light', toggleTheme: () => {} });

function getTimezoneDefault(): Theme {
  try {
    const etHour = parseInt(
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false }),
      10
    );
    // Check URL for region hint
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const isIndia = path.startsWith('/india');
    const isUS = path.startsWith('/us');

    if (!isIndia && !isUS) return 'light'; // Landing page default

    const isDaytimeET = etHour >= 7 && etHour < 19;

    if (isUS) return isDaytimeET ? 'light' : 'dark';
    // India: opposite of US daytime
    return isDaytimeET ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const manual = localStorage.getItem('cruxway-theme-manual') as Theme | null;
      if (manual === 'light' || manual === 'dark') return manual;
      return getTimezoneDefault();
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Only write to non-manual key for session awareness
    localStorage.setItem('cruxway-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('cruxway-theme-manual', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);