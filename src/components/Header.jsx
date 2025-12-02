import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

// Inline icon components for clarity
const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 10h16M10 2c-2.5 3-2.5 5-2.5 8s0 5 2.5 8M10 2c2.5 3 2.5 5 2.5 8s0 5-2.5 8" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <circle cx="10" cy="10" r="3" fill="currentColor"/>
    <path d="M10 2v2M10 16v2M18 10h-2M4 10H2M15.66 4.34l-1.41 1.41M5.75 14.25l-1.41 1.41M15.66 15.66l-1.41-1.41M5.75 5.75L4.34 4.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="currentColor"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h3a2 2 0 012 2v9a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h3zm2 0h4V5a1 1 0 00-1-1H9a1 1 0 00-1 1v1z" fill="currentColor"/>
  </svg>
);

const MenuIcon = ({ open }) => (
  <div className="flex flex-col justify-center" aria-hidden="true">
    <span className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300 mb-1 rounded" />
    <span className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300 mb-1 rounded" />
    <span className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300 rounded" />
  </div>
);

export const Header = ({ currentPage, onNavigate, language, onLanguageChange }) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { isDark, toggleTheme, isBusinessMode, toggleBusinessMode } = useTheme();
  const langMenuRef = useRef(null);
  const langButtonRef = useRef(null);

  const toggleLangMenu = () => setLangMenuOpen(o => !o);

  const handleNavigation = (page) => {
    onNavigate(page);
  };

  const handleLanguageChange = (lang) => {
    onLanguageChange(lang);
    setLangMenuOpen(false);
    // Return focus to toggle for accessibility
    langButtonRef.current?.focus();
  };

  // Close language menu when user clicks outside or presses Escape key
  useEffect(() => {
    if (!langMenuOpen) return;
    
    const handleEscapeKey = (event) => { 
      if (event.key === 'Escape') setLangMenuOpen(false); 
    };
    
    const handleOutsideClick = (event) => { 
      if (langMenuRef.current && !langMenuRef.current.contains(event.target) && !langButtonRef.current.contains(event.target)) {
        setLangMenuOpen(false); 
      }
    };
    
    window.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('mousedown', handleOutsideClick);
    
    return () => { 
      window.removeEventListener('keydown', handleEscapeKey); 
      window.removeEventListener('mousedown', handleOutsideClick); 
    };
  }, [langMenuOpen]);

  return (
    <>
      <header className="flex w-full h-[60px] items-center justify-center px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
        <nav aria-label="Main" className="flex items-center gap-8">
          <button
            onClick={() => handleNavigation('home')}
            className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation('map')}
            className={`text-sm font-medium transition-colors ${currentPage === 'map' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Map
          </button>
          <button
            onClick={() => handleNavigation('about')}
            className={`text-sm font-medium transition-colors ${currentPage === 'about' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
          >
            About
          </button>
        </nav>
        <div className="absolute right-6 flex items-center gap-4">
          {/* Business Mode Toggle */}
          <button
            type="button"
            aria-label={isBusinessMode ? "Disable business mode" : "Enable business mode"}
            onClick={toggleBusinessMode}
            className={`flex items-center justify-center transition-colors ${
              isBusinessMode 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            } focus:outline-none`}
          >
            <BriefcaseIcon />
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            className="flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none transition-colors"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              ref={langButtonRef}
              type="button"
              aria-label="Change language"
              aria-haspopup="true"
              aria-expanded={langMenuOpen}
              onClick={toggleLangMenu}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none transition-colors"
            >
              <GlobeIcon />
              <span className="font-medium">{language}</span>
            </button>
            {langMenuOpen && (
              <div 
                ref={langMenuRef}
                role="menu" 
                aria-label="Language selection" 
                className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[100] w-32 py-2 transition-colors"
              >
                <button
                  role="menuitem"
                  onClick={() => handleLanguageChange('EN')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${language === 'EN' ? 'bg-gray-50 dark:bg-gray-700 font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  English
                </button>
                <button
                  role="menuitem"
                  onClick={() => handleLanguageChange('ZH')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${language === 'ZH' ? 'bg-gray-50 dark:bg-gray-700 font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  中文
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};