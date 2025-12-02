import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Map from "./pages/Map";
import WasherDetail from "./pages/WasherDetail";
import { Header } from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [previousPage, setPreviousPage] = useState('home');
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [language, setLanguage] = useState('EN');

  const handleMachineClick = (machineId) => {
    setPreviousPage(currentPage);
    setSelectedMachine(machineId);
    setCurrentPage('washer-detail');
  };

  const handleBackFromDetail = () => {
    setSelectedMachine(null);
    setCurrentPage(previousPage);
  };

  // Render the appropriate page component based on current navigation state
  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'about':
        return <About language={language} />;
      case 'map':
        return <Map language={language} onMachineClick={handleMachineClick} />;
      case 'washer-detail':
        return <WasherDetail machineId={selectedMachine} onBack={handleBackFromDetail} language={language} />;
      default:
        return <Home language={language} onMachineClick={handleMachineClick} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {currentPage !== 'washer-detail' && (
          <Header currentPage={currentPage} onNavigate={setCurrentPage} language={language} onLanguageChange={setLanguage} />
        )}
        {renderCurrentPage()}
      </div>
    </ThemeProvider>
  );
}

export default App;