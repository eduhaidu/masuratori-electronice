import { useState } from 'react';
import './Dashboard.css';

function Dashboard({ onNavigateToSala }) {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="university-logo">
          <div className="logo-placeholder">
            <span>TECHNICAL</span>
            <span>UNIVERSITY</span>
            <span>of Cluj-Napoca</span>
          </div>
        </div>
        <button className="raport-button">Raport</button>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Section - Control Buttons */}
        <div className="control-section">
          {/* Sala Sport */}
          <div className="control-group">
            <h3 className="section-title">SALA SPORT</h3>
            <button className="control-button" onClick={() => onNavigateToSala('sala-sport')}>
              Open
            </button>
          </div>

          {/* Corp A */}
          <div className="control-group">
            <h3 className="section-title">CORP A</h3>
            <button className="control-button">Open</button>
          </div>

          {/* Corp B */}
          <div className="control-group">
            <h3 className="section-title">CORP B</h3>
            <button className="control-button">Open</button>
          </div>

          {/* Aula 1 */}
          <div className="control-group">
            <h3 className="section-title">AULA 1</h3>
            <button className="control-button">Open</button>
          </div>

          {/* Aula 2 */}
          <div className="control-group">
            <h3 className="section-title">AULA 2</h3>
            <button className="control-button">Open</button>
          </div>
        </div>

        {/* Center Section - Consumption Data */}
        <div className="consumption-section">
          {/* Top Row */}
          <div className="consumption-row">
            <div className="consumption-card">
              <h4>Consum Sala Sport</h4>
              <div className="consumption-value">
                <span className="value">3589.07</span>
                <span className="unit">kWh</span>
              </div>
            </div>

            <div className="consumption-card">
              <h4>Consum Corp A</h4>
              <div className="consumption-value">
                <span className="value">4258.93</span>
                <span className="unit">kWh</span>
              </div>
            </div>

            <div className="consumption-card">
              <h4>Consum Corp B</h4>
              <div className="consumption-value">
                <span className="value">7892.1</span>
                <span className="unit">kWh</span>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="consumption-row">
            <div className="consumption-card">
              <h4>Consum AULA 1</h4>
              <div className="consumption-value">
                <span className="value">1212.59</span>
                <span className="unit">kWh</span>
              </div>
            </div>

            <div className="consumption-card">
              <h4>Consum AULA 2</h4>
              <div className="consumption-value">
                <span className="value">1345.06</span>
                <span className="unit">kWh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Environmental Data */}
        <div className="environmental-section">
          <div className="env-card">
            <h4>Temperatura exterioara</h4>
            <div className="env-value">
              <span className="value">33.5</span>
              <span className="unit">°C</span>
            </div>
          </div>

          <div className="env-card">
            <h4>UMIDITATE EXTERIOARA</h4>
            <div className="env-value">
              <span className="value">42.08</span>
              <span className="unit">%</span>
            </div>
          </div>

          <div className="env-card">
            <h4>UMIDITATE SALA SPORT</h4>
            <div className="env-value">
              <span className="value">48.5</span>
              <span className="unit">%</span>
            </div>
          </div>

          <div className="env-card">
            <h4>UMIDITATE CORP A</h4>
            <div className="env-value">
              <span className="value">52.3</span>
              <span className="unit">%</span>
            </div>
          </div>

          <div className="env-card">
            <h4>UMIDITATE CORP B</h4>
            <div className="env-value">
              <span className="value">49.7</span>
              <span className="unit">%</span>
            </div>
          </div>

          <div className="env-card">
            <h4>UMIDITATE AULA 1</h4>
            <div className="env-value">
              <span className="value">51.05</span>
              <span className="unit">%</span>
            </div>
          </div>

          <div className="env-card">
            <h4>UMIDITATE AULA 2</h4>
            <div className="env-value">
              <span className="value">56.72</span>
              <span className="unit">%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
