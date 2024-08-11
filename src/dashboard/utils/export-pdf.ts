// @ts-nocheck

import html2pdf from 'html2pdf.js';

export const exportHTMLToPDF = (htmlString: string, nameFile: string) => {
    // Crear un contenedor temporal para el HTML
    const container = document.createElement('div');
    container.innerHTML = htmlString;
    document.body.appendChild(container);

    container.innerHTML = htmlString;
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';
    container.style.padding = '20px';
    container.style.pageBreakInside = 'auto'; // Evita el corte de páginas en medio del contenido
    
  
    html2pdf().from(container).set({
        margin: [20, 20, 20, 20],
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
      }).toPdf().get('pdf').then(pdf => {
        document.body.removeChild(container);
        pdf.save(`${nameFile.replace(/ /g, "_")}.pdf`);
      });
  };