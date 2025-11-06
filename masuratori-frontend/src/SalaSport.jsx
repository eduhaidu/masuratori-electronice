import { useState } from 'react';
import { generateSalaReport } from './utils/pdfGenerator';
import './SalaSport.css';

function SalaSport({ onBack, salaId }) {
  // Definim datele pentru fiecare sală
  const saliData = {
    'sala-sport': {
      name: 'SALA SPORT',
      values: {
        l1n: '56.3',
        l2n: '55.9',
        l3n: '56.7',
        l1l2: '398.5',
        l2l3: '397.2',
        l3l1: '399.1'
      }
    },
    'corp-a': {
      name: 'CORP A',
      values: {
        l1n: '62.8',
        l2n: '61.5',
        l3n: '63.2',
        l1l2: '402.3',
        l2l3: '401.8',
        l3l1: '403.5'
      }
    },
    'corp-b': {
      name: 'CORP B',
      values: {
        l1n: '78.4',
        l2n: '77.9',
        l3n: '79.1',
        l1l2: '405.7',
        l2l3: '404.9',
        l3l1: '406.2'
      }
    },
    'aula-1': {
      name: 'AULA 1',
      values: {
        l1n: '34.5',
        l2n: '33.8',
        l3n: '35.1',
        l1l2: '395.2',
        l2l3: '394.6',
        l3l1: '396.0'
      }
    },
    'aula-2': {
      name: 'AULA 2',
      values: {
        l1n: '38.2',
        l2n: '37.6',
        l3n: '38.9',
        l1l2: '396.8',
        l2l3: '396.1',
        l3l1: '397.5'
      }
    }
  };

  const currentSala = saliData[salaId] || saliData['sala-sport'];

  const handleGenerateReport = () => {
    // Adaugă și datele de consum pentru raport
    const reportData = {
      ...currentSala,
      id: salaId,
      consum: salaId === 'sala-sport' ? '3589.07' :
              salaId === 'corp-a' ? '4258.93' :
              salaId === 'corp-b' ? '7892.1' :
              salaId === 'aula-1' ? '1212.59' : '1345.06',
      temperatura: salaId === 'sala-sport' ? '22.5' :
                   salaId === 'corp-a' ? '23.1' :
                   salaId === 'corp-b' ? '21.8' :
                   salaId === 'aula-1' ? '24.2' : '23.7',
      umiditate: salaId === 'sala-sport' ? '48.5' :
                 salaId === 'corp-a' ? '52.3' :
                 salaId === 'corp-b' ? '49.7' :
                 salaId === 'aula-1' ? '51.05' : '56.72'
    };
    generateSalaReport(reportData, '24h');
  };

  return (
    <div className="sala-sport-container">
      {/* Header */}
      <header className="sala-sport-header">
        <div className="university-logo">
          <div className="logo-placeholder">
            <span>TECHNICAL</span>
            <span>UNIVERSITY</span>
            <span>of Cluj-Napoca</span>
          </div>
        </div>
        <div className="header-right">
          <button className="back-button-header" onClick={onBack}>
            ← Înapoi
          </button>
          <h1 className="sala-title">{currentSala.name}</h1>
          <button className="report-button-header" onClick={handleGenerateReport}>
            📄 Generează Raport
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="sala-sport-content">
        {/* Left Section - Control Buttons */}
        <div className="measurements-section">
          {/* Incarcare faze */}
          <div className="measurement-group">
            <h3 className="measurement-title">Incarcare faze</h3>
            <button className="measurement-button">Open</button>
          </div>

          {/* Tensiune faze */}
          <div className="measurement-group">
            <h3 className="measurement-title">Tensiune faze</h3>
            <button className="measurement-button">Open</button>
          </div>

          {/* Diagrama */}
          <div className="measurement-group">
            <h3 className="measurement-title">Diagrama</h3>
            <button className="measurement-button">Open</button>
          </div>

          {/* Putere Activa */}
          <div className="measurement-group">
            <h3 className="measurement-title">Putere Activa</h3>
            <button className="measurement-button">Open</button>
          </div>

          {/* Putere reactiva */}
          <div className="measurement-group">
            <h3 className="measurement-title">Putere reactiva</h3>
            <button className="measurement-button">Open</button>
          </div>

          {/* Putere aparenta */}
          <div className="measurement-group">
            <h3 className="measurement-title">Putere aparenta</h3>
            <button className="measurement-button">Open</button>
          </div>

          {/* Energie Activa */}
          <div className="measurement-group">
            <h3 className="measurement-title">Energie Activa</h3>
            <button className="measurement-button">Open</button>
          </div>

          {/* Energie Reactiva */}
          <div className="measurement-group">
            <h3 className="measurement-title">Energie Reactiva</h3>
            <button className="measurement-button">Open</button>
          </div>

          {/* Energie Aparenta */}
          <div className="measurement-group">
            <h3 className="measurement-title">Energie Aparenta</h3>
            <button className="measurement-button">Open</button>
          </div>

          {/* cos φ */}
          <div className="measurement-group">
            <h3 className="measurement-title">cos φ</h3>
            <button className="measurement-button">Open</button>
          </div>
        </div>

        {/* Right Section - Values Table */}
        <div className="values-section">
          <div className="values-card">
            <h2 className="values-title">VALORI MARIMI ELECTRICE MASURATE</h2>
            
            {/* First Table */}
            <table className="values-table">
              <thead>
                <tr>
                  <th>L1-N</th>
                  <th>L2-N</th>
                  <th>L3-N</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{currentSala.values.l1n}</td>
                  <td>{currentSala.values.l2n}</td>
                  <td>{currentSala.values.l3n}</td>
                  <td className="unit-cell">A</td>
                </tr>
              </tbody>
            </table>

            {/* Second Table */}
            <table className="values-table">
              <thead>
                <tr>
                  <th>L1-L2</th>
                  <th>L2-L3</th>
                  <th>L3-L1</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{currentSala.values.l1l2}</td>
                  <td>{currentSala.values.l2l3}</td>
                  <td>{currentSala.values.l3l1}</td>
                  <td className="unit-cell">V</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalaSport;
