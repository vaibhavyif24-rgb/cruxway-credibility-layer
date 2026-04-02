import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type Theme = 'light' | 'dark';
type Region = 'india' | 'us' | null;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setRegionTheme: (region: Region) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setRegionTheme: () => {},
});

function getThemeForRegion(region: Region): Theme {
  if (!region) return 'light';

  try {
    const etHour = parseInt(
      new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        hour12: false,
      }),
      10
    );

    const isDaytimeET = etHour >= 7 && etHour < 19;

    if (region === 'us') return isDaytimeET ? 'light' : 'dark';
    return isDaytimeET ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const region: Region = path.startsWith('/india')
        ? 'india'
        : path.startsWith('/us')
          ? 'us'
          : null;
      return getThemeForRegion(region);
    }
    return 'light';
  });

  // Clear stale localStorage from older versions
  useEffect(() => {
    try {
      localStorage.removeItem('cruxway-theme-manual');
      localStorage.removeItem('cruxway-theme');
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const setRegionTheme = useCallback((region: Region) => {
    setTheme(getThemeForRegion(region));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setRegionTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
