import { useState } from 'react';
import './SalaSport.css';

function SalaSport({ onBack }) {
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
          <h1 className="sala-title">SALA SPORT</h1>
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
                  <td>56.3</td>
                  <td>55.9</td>
                  <td>56.7</td>
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
                  <th>L3-N</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>56.3</td>
                  <td>55.9</td>
                  <td>56.7</td>
                  <td className="unit-cell">A</td>
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
