import { useState } from 'react'
import Dashboard from './Dashboard'
import SalaSport from './SalaSport'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentSala, setCurrentSala] = useState(null);
  const [salaData, setSalaData] = useState(null);

  const handleNavigateToSala = (salaId, data) => {
    setCurrentSala(salaId);
    setSalaData(data);
    setCurrentView('sala-detail');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentSala(null);
    setSalaData(null);
  };

  return (
    <>
      {currentView === 'dashboard' && (
        <Dashboard onNavigateToSala={handleNavigateToSala} />
      )}
      {currentView === 'sala-detail' && currentSala && (
        <SalaSport onBack={handleBackToDashboard} salaId={currentSala} salaData={salaData} />
      )}
    </>
  )
}

export default App
