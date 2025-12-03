import { useState, useMemo, useEffect } from 'react';
import Axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateSalaReport, generateGeneralReport } from './utils/pdfGenerator';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Dashboard({ onNavigateToSala }) {
  const [selectedSala, setSelectedSala] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ sala: null, option: null });
  const [timeInterval, setTimeInterval] = useState('24h');
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/api/device-data');
        setDeviceData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching device data:', error);
        setLoading(false);
      }
    };

    // Fetch inițial
    fetchDeviceData();

    // Polling la fiecare 5 secunde
    const interval = setInterval(fetchDeviceData, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mapare date API la sali (momentan toate sălile primesc aceleași date de la același device)
  const sali = [
    { 
      id: 'sala-sport', 
      name: 'SALA SPORT',
      consum: deviceData?.data?.energy_import?.toFixed(2) || '0.00',
      temperatura: '22.5', // Mock - necesită senzor separat
      umiditate: '48.5',   // Mock - necesită senzor separat
      currents: {
        l1: deviceData?.data?.current_l1?.toFixed(3) || '0.000',
        l2: deviceData?.data?.current_l2?.toFixed(3) || '0.000',
        l3: deviceData?.data?.current_l3?.toFixed(3) || '0.000'
      },
      voltages: {
        l1n: deviceData?.data?.voltage_l1_n?.toFixed(2) || '0.00',
        l2n: deviceData?.data?.voltage_l2_n?.toFixed(2) || '0.00',
        l3n: deviceData?.data?.voltage_l3_n?.toFixed(2) || '0.00'
      },
      power: deviceData?.data?.active_power?.toFixed(2) || '0.00'
    },
    { 
      id: 'corp-a', 
      name: 'CORP A',
      consum: deviceData?.data?.energy_import ? (deviceData.data.energy_import * 1.18).toFixed(2) : '0.00',
      temperatura: '23.1',
      umiditate: '52.3',
      currents: {
        l1: deviceData?.data?.current_l1 ? (deviceData.data.current_l1 * 1.1).toFixed(3) : '0.000',
        l2: deviceData?.data?.current_l2 ? (deviceData.data.current_l2 * 1.1).toFixed(3) : '0.000',
        l3: deviceData?.data?.current_l3 ? (deviceData.data.current_l3 * 1.1).toFixed(3) : '0.000'
      },
      voltages: {
        l1n: deviceData?.data?.voltage_l1_n?.toFixed(2) || '0.00',
        l2n: deviceData?.data?.voltage_l2_n?.toFixed(2) || '0.00',
        l3n: deviceData?.data?.voltage_l3_n?.toFixed(2) || '0.00'
      },
      power: deviceData?.data?.active_power ? (deviceData.data.active_power * 1.1).toFixed(2) : '0.00'
    },
    { 
      id: 'corp-b', 
      name: 'CORP B',
      consum: deviceData?.data?.energy_import ? (deviceData.data.energy_import * 2.2).toFixed(2) : '0.00',
      temperatura: '21.8',
      umiditate: '49.7',
      currents: {
        l1: deviceData?.data?.current_l1 ? (deviceData.data.current_l1 * 1.4).toFixed(3) : '0.000',
        l2: deviceData?.data?.current_l2 ? (deviceData.data.current_l2 * 1.4).toFixed(3) : '0.000',
        l3: deviceData?.data?.current_l3 ? (deviceData.data.current_l3 * 1.4).toFixed(3) : '0.000'
      },
      voltages: {
        l1n: deviceData?.data?.voltage_l1_n?.toFixed(2) || '0.00',
        l2n: deviceData?.data?.voltage_l2_n?.toFixed(2) || '0.00',
        l3n: deviceData?.data?.voltage_l3_n?.toFixed(2) || '0.00'
      },
      power: deviceData?.data?.active_power ? (deviceData.data.active_power * 1.4).toFixed(2) : '0.00'
    },
    { 
      id: 'aula-1', 
      name: 'AULA 1',
      consum: deviceData?.data?.energy_import ? (deviceData.data.energy_import * 0.34).toFixed(2) : '0.00',
      temperatura: '24.2',
      umiditate: '51.05',
      currents: {
        l1: deviceData?.data?.current_l1 ? (deviceData.data.current_l1 * 0.6).toFixed(3) : '0.000',
        l2: deviceData?.data?.current_l2 ? (deviceData.data.current_l2 * 0.6).toFixed(3) : '0.000',
        l3: deviceData?.data?.current_l3 ? (deviceData.data.current_l3 * 0.6).toFixed(3) : '0.000'
      },
      voltages: {
        l1n: deviceData?.data?.voltage_l1_n?.toFixed(2) || '0.00',
        l2n: deviceData?.data?.voltage_l2_n?.toFixed(2) || '0.00',
        l3n: deviceData?.data?.voltage_l3_n?.toFixed(2) || '0.00'
      },
      power: deviceData?.data?.active_power ? (deviceData.data.active_power * 0.6).toFixed(2) : '0.00'
    },
    { 
      id: 'aula-2', 
      name: 'AULA 2',
      consum: deviceData?.data?.energy_import ? (deviceData.data.energy_import * 0.37).toFixed(2) : '0.00',
      temperatura: '23.7',
      umiditate: '56.72',
      currents: {
        l1: deviceData?.data?.current_l1 ? (deviceData.data.current_l1 * 0.68).toFixed(3) : '0.000',
        l2: deviceData?.data?.current_l2 ? (deviceData.data.current_l2 * 0.68).toFixed(3) : '0.000',
        l3: deviceData?.data?.current_l3 ? (deviceData.data.current_l3 * 0.68).toFixed(3) : '0.000'
      },
      voltages: {
        l1n: deviceData?.data?.voltage_l1_n?.toFixed(2) || '0.00',
        l2n: deviceData?.data?.voltage_l2_n?.toFixed(2) || '0.00',
        l3n: deviceData?.data?.voltage_l3_n?.toFixed(2) || '0.00'
      },
      power: deviceData?.data?.active_power ? (deviceData.data.active_power * 0.68).toFixed(2) : '0.00'
    },
  ];

  const handleSalaChange = (e) => {
    const salaId = e.target.value;
    setSelectedSala(salaId);
    setShowDropdown(false);
    setSelectedOption({ sala: null, option: null });
  };

  const handleOptionClick = (optionId) => {
    if (!selectedSala) {
      alert('Te rog selectează mai întâi o sală');
      return;
    }
    
    if (optionId === 'pagina') {
      const sala = sali.find(s => s.id === selectedSala);
      onNavigateToSala(selectedSala, sala);
    } else {
      setSelectedOption({ sala: selectedSala, option: optionId });
      setTimeInterval('24h'); // Reset to default interval
    }
    setShowDropdown(false);
  };

  const handleGenerateReport = () => {
    if (selectedSala) {
      // Raport pentru o sală specifică
      const sala = sali.find(s => s.id === selectedSala);
      generateSalaReport(sala, timeInterval);
    } else {
      // Raport general pentru toate sălile
      generateGeneralReport(sali);
    }
  };

  // Generate mock data based on time interval
  const generateChartData = useMemo(() => {
    if (!selectedOption.sala || !selectedOption.option) return null;

    const intervals = {
      '1h': { points: 12, labels: Array.from({length: 12}, (_, i) => `${i*5}m`) },
      '6h': { points: 12, labels: Array.from({length: 12}, (_, i) => `${i*30}m`) },
      '12h': { points: 12, labels: Array.from({length: 12}, (_, i) => `${i}h`) },
      '24h': { points: 24, labels: Array.from({length: 24}, (_, i) => `${i}:00`) },
      '7d': { points: 7, labels: ['Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm', 'Dum'] },
      '30d': { points: 30, labels: Array.from({length: 30}, (_, i) => `Ziua ${i+1}`) },
    };

    const { points, labels } = intervals[timeInterval];
    const sala = sali.find(s => s.id === selectedOption.sala);
    
    let baseValue, variance, unit;
    if (selectedOption.option === 'consum') {
      baseValue = parseFloat(sala.consum);
      variance = baseValue * 0.15;
      unit = 'kWh';
    } else if (selectedOption.option === 'temperatura') {
      baseValue = parseFloat(sala.temperatura);
      variance = 2;
      unit = '°C';
    } else {
      baseValue = parseFloat(sala.umiditate);
      variance = 5;
      unit = '%';
    }

    const data = Array.from({length: points}, () => 
      baseValue + (Math.random() - 0.5) * variance
    );

    return { labels, data, unit };
  }, [selectedOption, timeInterval]);

  const chartData = generateChartData ? {
    labels: generateChartData.labels,
    datasets: [
      {
        label: `${selectedOption.option === 'consum' ? 'Consum' : 
                selectedOption.option === 'temperatura' ? 'Temperatura' : 'Umiditate'} (${generateChartData.unit})`,
        data: generateChartData.data,
        borderColor: '#0052a3',
        backgroundColor: 'rgba(0, 82, 163, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#0052a3',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#1a1a1a',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#666',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#666',
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  };

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

        <div className="header-controls">
          {/* Sala Selector */}
          <div className="sala-selector">
            <label htmlFor="sala-select" className="selector-label">Selectează Sala:</label>
            <select 
              id="sala-select"
              className="sala-select" 
              value={selectedSala} 
              onChange={handleSalaChange}
            >
              <option value="">-- Alege o sală --</option>
              {sali.map((sala) => (
                <option key={sala.id} value={sala.id}>
                  {sala.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Button */}
          <div className="dropdown-wrapper">
            <button 
              className={`dropdown-trigger ${!selectedSala ? 'disabled' : ''}`}
              onClick={() => setShowDropdown(!showDropdown)}
              disabled={!selectedSala}
            >
              Opțiuni Afișare ▼
            </button>
            
            {showDropdown && selectedSala && (
              <div className="dropdown-menu">
                <button 
                  className="dropdown-item"
                  onClick={() => handleOptionClick('consum')}
                >
                  📊 Consum
                </button>
                <button 
                  className="dropdown-item"
                  onClick={() => handleOptionClick('temperatura')}
                >
                  🌡️ Temperatura
                </button>
                <button 
                  className="dropdown-item"
                  onClick={() => handleOptionClick('umiditate')}
                >
                  💧 Umiditate
                </button>
                <button 
                  className="dropdown-item primary"
                  onClick={() => handleOptionClick('pagina')}
                >
                  🏢 Deschide Pagina Sălii
                </button>
              </div>
            )}
          </div>

          <button className="raport-button" onClick={handleGenerateReport}>
            📄 {selectedSala ? 'Raport Sala' : 'Raport General'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">
        {loading && (
          <div className="loading-message">
            <p>Se încarcă datele de la dispozitiv...</p>
          </div>
        )}

        {/* Environmental Data Section */}
        <div className="environmental-container">
          <div className="env-card">
            <h4>Putere Activă Totală</h4>
            <div className="env-value">
              <span className="value">{deviceData?.data?.active_power?.toFixed(2) || '0.00'}</span>
              <span className="unit">W</span>
            </div>
          </div>

          <div className="env-card">
            <h4>Energie Totală Importată</h4>
            <div className="env-value">
              <span className="value">{deviceData?.data?.energy_import?.toFixed(2) || '0.00'}</span>
              <span className="unit">kWh</span>
            </div>
          </div>
        </div>

        {/* Data Display Section */}
        <div className="data-section">

          {selectedOption.sala && selectedOption.option && (
            <>
              <div className="selected-data-display">
                <h3 className="selected-title">
                  {selectedOption.option === 'consum' ? 'CONSUM' :
                   selectedOption.option === 'temperatura' ? 'TEMPERATURA' : 'UMIDITATE'}
                </h3>
                <h4 className="selected-sala">
                  {sali.find(s => s.id === selectedOption.sala)?.name}
                </h4>
                <div className="selected-value">
                  {selectedOption.option === 'consum' && (
                    <>
                      <span className="value">{sali.find(s => s.id === selectedOption.sala)?.consum}</span>
                      <span className="unit">kWh</span>
                    </>
                  )}
                  {selectedOption.option === 'temperatura' && (
                    <>
                      <span className="value">{sali.find(s => s.id === selectedOption.sala)?.temperatura}</span>
                      <span className="unit">°C</span>
                    </>
                  )}
                  {selectedOption.option === 'umiditate' && (
                    <>
                      <span className="value">{sali.find(s => s.id === selectedOption.sala)?.umiditate}</span>
                      <span className="unit">%</span>
                    </>
                  )}
                </div>

                {/* Time Interval Selector */}
                <div className="time-selector">
                  <h5 className="time-selector-title">Interval de timp:</h5>
                  <div className="time-buttons">
                    <button 
                      className={`time-button ${timeInterval === '1h' ? 'active' : ''}`}
                      onClick={() => setTimeInterval('1h')}
                    >
                      1h
                    </button>
                    <button 
                      className={`time-button ${timeInterval === '6h' ? 'active' : ''}`}
                      onClick={() => setTimeInterval('6h')}
                    >
                      6h
                    </button>
                    <button 
                      className={`time-button ${timeInterval === '12h' ? 'active' : ''}`}
                      onClick={() => setTimeInterval('12h')}
                    >
                      12h
                    </button>
                    <button 
                      className={`time-button ${timeInterval === '24h' ? 'active' : ''}`}
                      onClick={() => setTimeInterval('24h')}
                    >
                      24h
                    </button>
                    <button 
                      className={`time-button ${timeInterval === '7d' ? 'active' : ''}`}
                      onClick={() => setTimeInterval('7d')}
                    >
                      7 zile
                    </button>
                    <button 
                      className={`time-button ${timeInterval === '30d' ? 'active' : ''}`}
                      onClick={() => setTimeInterval('30d')}
                    >
                      30 zile
                    </button>
                  </div>
                </div>
              </div>

              {/* Chart Display */}
              {chartData && (
                <div className="chart-container">
                  <h3 className="chart-title">
                    Istoric {selectedOption.option === 'consum' ? 'Consum' :
                            selectedOption.option === 'temperatura' ? 'Temperatura' : 'Umiditate'} - Interval {timeInterval}
                  </h3>
                  <div className="chart-wrapper">
                    <Line data={chartData} options={chartOptions} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
