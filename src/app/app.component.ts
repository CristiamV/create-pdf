import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { PdfServiceService } from './services/pdf-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pdf-test';
  precioDollar: number = 5.95;
  price: number = 0;
  valor: any = '';
  comisionUsd = 0;
  comisionBs = '';
  totalUsd = 0;
  totalBs = 0;
  docId = "V-21175861"
  date = formatDate(new Date(), 'dd/MM/y - hh:mm:ss aa', 'en').toLowerCase()

  constructor( private pdfService: PdfServiceService){}

  generatePDF(){
    this.pdfService.generatePDF(this.docId)
  }
}
