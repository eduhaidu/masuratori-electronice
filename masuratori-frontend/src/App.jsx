import { useState } from 'react'
import Dashboard from './Dashboard'
import SalaSport from './SalaSport'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentSala, setCurrentSala] = useState(null);

  const handleNavigateToSala = (salaId) => {
    setCurrentSala(salaId);
    setCurrentView('sala-detail');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setCurrentSala(null);
  };

  return (
    <>
      {currentView === 'dashboard' && (
        <Dashboard onNavigateToSala={handleNavigateToSala} />
      )}
      {currentView === 'sala-detail' && currentSala && (
        <SalaSport onBack={handleBackToDashboard} salaId={currentSala} />
      )}
    </>
  )
}

export default App
