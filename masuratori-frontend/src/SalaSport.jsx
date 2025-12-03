import { useState } from 'react';
import { generateSalaReport } from './utils/pdfGenerator';
import './SalaSport.css';

function SalaSport({ onBack, salaId, salaData }) {
  // Calculare tensiuni linie-linie (√3 × tensiune fază)
  const calculateLineVoltages = (voltages) => {
    const l1n = parseFloat(voltages?.l1n) || 0;
    const l2n = parseFloat(voltages?.l2n) || 0;
    const l3n = parseFloat(voltages?.l3n) || 0;
    const avgPhaseVoltage = (l1n + l2n + l3n) / 3;
    const lineVoltage = avgPhaseVoltage * Math.sqrt(3);
    
    return {
      l1l2: lineVoltage.toFixed(2),
      l2l3: lineVoltage.toFixed(2),
      l3l1: lineVoltage.toFixed(2)
    };
  };

  const lineVoltages = salaData?.voltages ? calculateLineVoltages(salaData.voltages) : { l1l2: '0.00', l2l3: '0.00', l3l1: '0.00' };

  const currentSala = {
    name: salaData?.name || 'SALA',
    values: {
      // Curenți din API
      l1n: salaData?.currents?.l1 || '0.000',
      l2n: salaData?.currents?.l2 || '0.000',
      l3n: salaData?.currents?.l3 || '0.000',
      // Tensiuni fază-neutru din API
      voltage_l1n: salaData?.voltages?.l1n || '0.00',
      voltage_l2n: salaData?.voltages?.l2n || '0.00',
      voltage_l3n: salaData?.voltages?.l3n || '0.00',
      // Tensiuni linie-linie calculate
      l1l2: lineVoltages.l1l2,
      l2l3: lineVoltages.l2l3,
      l3l1: lineVoltages.l3l1
    }
  };

  const handleGenerateReport = () => {
    const reportData = {
      ...currentSala,
      id: salaId,
      consum: salaData?.consum || '0.00',
      temperatura: salaData?.temperatura || '0.0',
      umiditate: salaData?.umiditate || '0.0',
      power: salaData?.power || '0.00'
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
            
            {/* First Table - Curenți */}
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

            {/* Second Table - Tensiuni fază-neutru */}
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
                  <td>{currentSala.values.voltage_l1n}</td>
                  <td>{currentSala.values.voltage_l2n}</td>
                  <td>{currentSala.values.voltage_l3n}</td>
                  <td className="unit-cell">V</td>
                </tr>
              </tbody>
            </table>

            {/* Third Table - Tensiuni linie-linie */}
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
