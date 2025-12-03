import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const fontName = 'Roboto';
  
export const generateSalaReport = (salaData, timeInterval = '24h') => {
  const doc = new jsPDF();
  // Culori
  const primaryColor = [0, 82, 163]; // #0052a3
  const secondaryColor = [139, 0, 0]; // #8B0000
  const lightGray = [245, 245, 245];
  
  // Header - Logo și titlu
  doc.setFillColor(...secondaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont(fontName, 'bold');
  doc.text('TECHNICAL UNIVERSITY', 105, 15, { align: 'center' });
  doc.setFontSize(16);
  doc.text('of Cluj-Napoca', 105, 22, { align: 'center' });
  
  doc.setFontSize(24);
  doc.text('RAPORT MASURATORI', 105, 33, { align: 'center' });
  
  // Informații sală și dată
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont(fontName, 'bold');
  doc.text(`Sala: ${salaData.name}`, 20, 55);
  
  doc.setFontSize(11);
  doc.setFont(fontName, 'normal');
  const currentDate = new Date().toLocaleString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  doc.text(`Data generarii: ${currentDate}`, 20, 62);
  doc.text(`Interval monitorizat: ${getIntervalText(timeInterval)}`, 20, 68);
  
  // Linie separator
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(20, 72, 190, 72);
  
  // Secțiunea: Date Generale
  let yPos = 80;
  doc.setFontSize(14);
  doc.setFont(fontName, 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('1. DATE GENERALE', 20, yPos);
  
  yPos += 10;
  autoTable(doc, {
    startY: yPos,
    head: [['Parametru', 'Valoare', 'Unitate']],
    body: [
      ['Consum Energie', salaData.consum, 'kWh'],
      ['Temperatura', salaData.temperatura, '°C'],
      ['Umiditate', salaData.umiditate, '%'],
    ],
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 11,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 10,
      halign: 'center'
    },
    columnStyles: {
      0: { fontStyle: 'bold', halign: 'left' },
      1: { halign: 'center' },
      2: { halign: 'center' }
    },
    margin: { left: 20, right: 20 }
  });
  
  // Secțiunea: Parametrii Electrici
  yPos = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(14);
  doc.setFont(fontName, 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('2. PARAMETRI ELECTRICI MASURATI', 20, yPos);
  
  yPos += 10;
  
  // Curenți de fază
  autoTable(doc, {
    startY: yPos,
    head: [['Curenti de Faza', 'L1-N', 'L2-N', 'L3-N']],
    body: [
      ['Valoare (A)', salaData.values?.l1n || 'N/A', salaData.values?.l2n || 'N/A', salaData.values?.l3n || 'N/A'],
    ],
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 10,
      halign: 'center',
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { fillColor: lightGray, fontStyle: 'bold' }
    },
    margin: { left: 20, right: 20 }
  });
  
  // Tensiuni
  yPos = doc.lastAutoTable.finalY + 8;
  autoTable(doc, {
    startY: yPos,
    head: [['Tensiuni', 'L1-L2', 'L2-L3', 'L3-L1']],
    body: [
      ['Valoare (V)', salaData.values?.l1l2 || 'N/A', salaData.values?.l2l3 || 'N/A', salaData.values?.l3l1 || 'N/A'],
    ],
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 10,
      halign: 'center',
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { fillColor: lightGray, fontStyle: 'bold' }
    },
    margin: { left: 20, right: 20 }
  });
  
  // Secțiunea: Date Statistice
  yPos = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(14);
  doc.setFont(fontName, 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('3. DATE STATISTICE', 20, yPos);
  
  yPos += 10;
  
  // Generăm date mock pentru statistici
  const stats = generateMockStats(salaData, timeInterval);
  
  autoTable(doc, {
    startY: yPos,
    head: [['Indicator', 'Consum (kWh)', 'Temperatura (°C)', 'Umiditate (%)']],
    body: [
      ['Valoare Medie', stats.consum.avg, stats.temperatura.avg, stats.umiditate.avg],
      ['Valoare Minima', stats.consum.min, stats.temperatura.min, stats.umiditate.min],
      ['Valoare Maxima', stats.consum.max, stats.temperatura.max, stats.umiditate.max],
      ['Deviatie Standard', stats.consum.std, stats.temperatura.std, stats.umiditate.std],
    ],
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 9,
      halign: 'center',
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { fontStyle: 'bold', halign: 'left', fillColor: lightGray }
    },
    margin: { left: 20, right: 20 }
  });
  
  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Pagina ${i} din ${pageCount}`,
      105,
      287,
      { align: 'center' }
    );
    doc.text(
      'Sistem de Monitorizare Masuratori Electronice - UTCN',
      105,
      292,
      { align: 'center' }
    );
  }
  
  // Salvare PDF
  const fileName = `Raport_${salaData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

// Funcție helper pentru text interval
const getIntervalText = (interval) => {
  const intervals = {
    '1h': 'Ultima ora',
    '6h': 'Ultimele 6 ore',
    '12h': 'Ultimele 12 ore',
    '24h': 'Ultimele 24 ore',
    '7d': 'Ultimele 7 zile',
    '30d': 'Ultimele 30 zile'
  };
  return intervals[interval] || 'Ultimele 24 ore';
};

// Funcție pentru generare statistici mock
const generateMockStats = (salaData, timeInterval) => {
  const baseConsum = parseFloat(salaData.consum);
  const baseTemp = parseFloat(salaData.temperatura);
  const baseHum = parseFloat(salaData.umiditate);
  
  return {
    consum: {
      avg: baseConsum.toFixed(2),
      min: (baseConsum * 0.85).toFixed(2),
      max: (baseConsum * 1.15).toFixed(2),
      std: (baseConsum * 0.08).toFixed(2)
    },
    temperatura: {
      avg: baseTemp.toFixed(1),
      min: (baseTemp - 1.5).toFixed(1),
      max: (baseTemp + 1.5).toFixed(1),
      std: '0.8'
    },
    umiditate: {
      avg: baseHum.toFixed(1),
      min: (baseHum - 3.0).toFixed(1),
      max: (baseHum + 3.0).toFixed(1),
      std: '1.5'
    }
  };
};

// Funcție pentru raport general (toate sălile)
export const generateGeneralReport = (saliData) => {
  const doc = new jsPDF();
  
  const primaryColor = [0, 82, 163];
  const secondaryColor = [139, 0, 0];
  
  // Header
  doc.setFillColor(...secondaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont(fontName, 'bold');
  doc.text('TECHNICAL UNIVERSITY', 105, 15, { align: 'center' });
  doc.setFontSize(16);
  doc.text('of Cluj-Napoca', 105, 22, { align: 'center' });
  
  doc.setFontSize(24);
  doc.text('RAPORT GENERAL', 105, 33, { align: 'center' });
  
  // Informații generale
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont(fontName, 'normal');
  const currentDate = new Date().toLocaleString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  doc.text(`Data generarii: ${currentDate}`, 20, 55);
  
  // Linie separator
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(20, 60, 190, 60);
  
  // Tabel cu toate sălile
  let yPos = 70;
  doc.setFontSize(14);
  doc.setFont(fontName, 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('REZUMAT TOATE SALILE', 20, yPos);
  
  yPos += 10;
  
  const tableData = saliData.map(sala => [
    sala.name,
    sala.consum,
    sala.temperatura,
    sala.umiditate
  ]);
  
  autoTable(doc, {
    startY: yPos,
    head: [['Sala', 'Consum (kWh)', 'Temperatura (°C)', 'Umiditate (%)']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 11,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 10,
      halign: 'center'
    },
    columnStyles: {
      0: { fontStyle: 'bold', halign: 'left' }
    },
    margin: { left: 20, right: 20 }
  });
  
  // Statistici generale
  yPos = doc.lastAutoTable.finalY + 15;
  doc.setFontSize(14);
  doc.setFont(fontName, 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('STATISTICI GENERALE', 20, yPos);
  
  yPos += 10;
  
  const totalConsum = saliData.reduce((sum, sala) => sum + parseFloat(sala.consum), 0);
  const avgTemp = saliData.reduce((sum, sala) => sum + parseFloat(sala.temperatura), 0) / saliData.length;
  const avgHum = saliData.reduce((sum, sala) => sum + parseFloat(sala.umiditate), 0) / saliData.length;
  
  autoTable(doc, {
    startY: yPos,
    head: [['Indicator', 'Valoare']],
    body: [
      ['Consum Total', `${totalConsum.toFixed(2)} kWh`],
      ['Consum Mediu / Sala', `${(totalConsum / saliData.length).toFixed(2)} kWh`],
      ['Temperatura Medie', `${avgTemp.toFixed(1)} °C`],
      ['Umiditate Medie', `${avgHum.toFixed(1)} %`],
      ['Numar Sali Monitorizate', saliData.length.toString()],
    ],
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 11,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 10,
    },
    columnStyles: {
      0: { fontStyle: 'bold', halign: 'left', fillColor: [245, 245, 245] },
      1: { halign: 'center' }
    },
    margin: { left: 20, right: 20 }
  });
  
  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Pagina ${i} din ${pageCount}`,
      105,
      287,
      { align: 'center' }
    );
    doc.text(
      'Sistem de Monitorizare MMasuratori Electronice - UTCN',
      105,
      292,
      { align: 'center' }
    );
  }
  
  // Salvare PDF
  const fileName = `Raport_General_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
