import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfServiceService {
  constructor() {}
  async generatePDF(docId: string, beneficiaryName: string, precioDollar: number, formatAccount:string) {
    let docDefinition = {
      pageSize: 'LETTER',

      header: {
        text: '1/6/2022 - 08:05:09 p. m.',
        alignment: 'right',
        margin: [0, 28, 20, 0],
        color: '#A1A1A1',
        fontSize: 12,
      },    
    
      content: [
        {
          table: {
            widths: [320, 'auto'],
            body: [
              [
                {
                  image: 'logo',
                  width: 200,
                },
                {
                  text: 'Detalle pago de servicios y facturas',
                  style: 'docTitle',
                },
              ],
            ],
          },
          margin: [-15, -10, 0, 10],
          layout: 'noBorders'
        },
        {
          table: {
            body: [
              [
                {
                  image: 'icon',
                  width: 35,
                  margin: [0, 3, 0, 0],
                },
                {
                  text: 'El pago de ha enviado exitosamente',
                  style: 'docSubTitle',
                },
              ],
            ],
          },
          margin: [105, 0, 0, 0],
          layout: 'noBorders',
        },
        {
          style: 'tableExample',
          table: {
            widths: [175, 165, 180],
            body: [
              [
                { text: 'Documento de identidad', style: 'tableHeader' },
                { text: 'Número de cuenta Mercantil', style: 'tableHeader' },
                {
                  text: 'Tasa de cambio (referencial) BCV',
                  style: 'tableHeader',
                },
              ],
              [
                { text: docId, style: 'tableValue' },
                { text: `${beneficiaryName} - •••••${formatAccount}`, style: 'tableValue'},
                { text: `Bs. ${precioDollar}`, style: 'tableValue' },
              ],
              [
                { text: 'Monto a enviar al beneficiario', style: 'tableHeader'},
                { text: 'Monto de la comisión', style: 'tableHeader' },
                { text: 'Monto total de la operación', style: 'tableHeader' },
              ],
              [{ text:[{text: 'USD ', style: 'usd'},{text: '300,00\n', style: 'tableValue'},{text: 'Bs. 1.395,00', style: 'bsValue'}]},
               { text:[{text: 'USD ', style: 'usd'},{text: '15,49\n', style: 'tableValue'},{text: 'Bs. 72,02', style: 'bsValue'}]},
               { text:[{text: 'USD ', style: 'usd'},{text: '315,49\n', style: 'tableValue'},{text: 'Bs. 1.467,02', style: 'bsValue'}]}
               //{ text: `CEDULA ${docId}`, style: 'tableValue' }
              ],
              
              [
                { text: 'Número de confirmación', style: 'tableHeader' },
                { text: 'Número de orden de pago', style: 'tableHeader' },
                { text: 'Fecha y Hora', style: 'tableHeader' },
              ],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ],
          },
          layout: 'noBorders',
        },
        {
          table: {
            widths:'*',
            body: [
                [{                        
                  fillColor: '#EEEEEE',
                  fontSize: 12,
                  color: '#666666',
                  text: 'La información mostrada en esta página es confidencial',
                  alignment: 'center',
                  margin: [0,10],
                }]
            ]
        },
        margin: [-40, 418, -20, 0],
        layout: 'noBorders'
        }
      ],
      pageMargins: [40, 50, 20, 0],

      /**ELEMENTOS A REFERIR */
      images: {
        logo: 'data:image/png;base64,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',

        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAS9SURBVHgB7ZhNbFRVFMfPfa0dMB0cA0LFqFPjFBbWVmyTibY4JHVhibHERf2IKSgbJMayMtUF01BTXJXGjGxqKhtjTdRuWmMCOgjGJkWhstF20ZEIIkJSmJJ2Cn2X83/z3vDmfUxn+t7s+CfNnfd176/3nHvuOZfonrxJ0CoVPRoPy+WqDlEhGkilmJQUEoJCeMa/5xQhU6pQUqSqJ8UtMTpxoCdFq1DJgNFE/27+qoskxUr5TpA8J0kOTuz/6IvSvisW7NNDMVIqh/lnGNfBwBpqrY3Qs5sfo8iGjVQTDPG9gPZuOpOhy+k5mr56hX6/dIFOzc7wvUWjqxSR2lss6IqAsYF4KBNYc1BK2Y3rh4MPUGdDM7Vvqc8BFaOxP8/T55On6d/0de1aCnFkbWaxN3kgPkerBYwO9IdFlfxOkmjEjL3T3EKdTzeRF301dYYGfzluXKZoiXYU8k9RCI6q6Cf+GcasJTre0GbPD2EW949+acxmQcgKp5sw6+2qyl8BF1m/kQZe7vQNDoI1tj9RR2cvXqBrCzdDokLGnnyxdST1Q3LR+q7i1AF8jvSZ+6T9VV/hDKHPw3rfcKGF7Jg22UyshREirFb69q19ZYEzC2bu+no4u8pVNvV7PUnzc6cZ1P6T7pa2ssNBGOPtphaDZtj6PA9Qnz3NtF5Xayl6raHJmIxwNPHxbnID5C3qfbQIJ+UQYuGhH8dysdAsxFZNQukiJ0At5glqrObgu3NrPfmtIQ7SfQw3zpB9J8Zsz3dueUpb3dhCnxvqe9wGKO+THWi319aR3wIcdhFDNevsvl2tb50ay6Kyi6yAilBeQLuN99ZywiGudj/f5vjutkeyY/M22JDjMn6oUobR1j20icoJl+h403UPj6zPjR0jKyBHxDCammp/QkupcNDm4DodJZtX5gEaN906mLl2xXH1+QUHwQ8haQKspCJ05PRxGvnjDBWTNKwWzk13VzGRlpch2bTKmDlLFuI73Lye1AqdJQ/QuHl53j74Xg7cQX363SD9mLlL6Rtaq2pZtwWQt5GTaKb//8/2YWTDJkq88rorpF9mnbmaG/tvGyCb+Bxa1BBOcoOEf/rlc2f1sRUpkzZALh9H0f48O+3oh26QWDx+wGXHntFaqbPkAU7s45RbUHKe4cb/Ou/aiRXSLzgkEsgJYUmNxQqYRadjaEamJgt2ZoX0CgcZbiJIHTTft2fUn/XPMmgYCetKOSFMjLqilRMML3BwE/gy06Qm3u2pNT+zZ9TLtAfN0OSpFXcOBOz2rfWe4DCGBgdJtdf63FbV/fP9idSjL7U9uKQuR+G0qL6s/uaXjEgwv5SBKflY5MPD1nccq7qF25k4nBUdfDD+TdF7cKlwub7ZtIH7M3Gn99wL96NcuEsu3GWZC3eG478d5pVbFKAVEqXA3uZWz8UUFgRWLEKKEHziJcQuN7gVAaFGPmVYWxmISyVbUGEWUVSVUrek9diK8GW4C3wOZk3u8XB4ZJZ+LngQs4lr7fiCa4hnuERAFo5EN+/4jZMO7K2/XbQcv8GkHCmsBbpnQDMoylNUgCV9KClJQj1WtgNMq+CfcpkrQRRbqGe4ZDCycuSWevqW5HPFKezzhfzsnsqpO14CPQpCu/f3AAAAAElFTkSuQmCC',
      },
      styles: {
        docTitle: {
          fontSize: 14,
          margin: [0, 30, 0, 0],
        },
        docSubTitle: {
          fontSize: 17,          
          alignment: 'center',
          margin: [0, 10, 0, 30],
        },
        tableExample: {
          margin: [0, 5, 0, 15]          
        },
        tableHeader: {
          fontSize: 12,
          color: '#4678B2',
        },
        tableValue: {
          fontSize: 12,
          color: '#666666',
        },
        usd: {
          fontSize: 12,
          color: '#96B5D1',
        },
        bsValue: {
          fontSize: 9,
          color: '#A1A1A1',
        }
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
