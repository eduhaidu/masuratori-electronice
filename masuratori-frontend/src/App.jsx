import { useState } from 'react'
import Dashboard from './Dashboard'
import SalaSport from './SalaSport'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const handleNavigateToSala = (sala) => {
    if (sala === 'sala-sport') {
      setCurrentView('sala-sport');
    }
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  return (
    <>
      {currentView === 'dashboard' && (
        <Dashboard onNavigateToSala={handleNavigateToSala} />
      )}
      {currentView === 'sala-sport' && (
        <SalaSport onBack={handleBackToDashboard} />
      )}
    </>
  )
}

export default App
