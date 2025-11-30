import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Map from "./pages/Map";
import { Header } from "./components/Header";

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('EN');

  // Render the appropriate page component based on current navigation state
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'about':
        return <About language={language} />;
      case 'map':
        return <Map language={language} />;
      default:
        return <Home language={language} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} language={language} onLanguageChange={setLanguage} />
      {renderCurrentPage()}
    </div>
  );
}

export default App;