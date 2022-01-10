import {Router} from "@angular/router";
import {Component, OnInit} from "@angular/core";
import {Sale} from "../../model/sale";
import {SaleService} from "../../../services/SaleService";
import {DatePipe, formatDate} from "@angular/common";
import {updatePlaceholderMap} from "@angular/compiler/src/render3/view/i18n/util";

@Component({
  selector: 'sales',
  templateUrl: 'sales.component.html',
  styleUrls: ['../../../assets/css/home.css']
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];

  ngOnInit(): void {
    this._saleService.getAll().subscribe((data: any) => {
      let datas: any[] = data;
      datas.forEach(data => {
        this.sales.push(this._saleService.createSale(data))
      })
    })
  }

  constructor(private router: Router, private _saleService: SaleService, ) {
  }

  dateFormatted(date){
    const datePipe:DatePipe  = new DatePipe("en-US");
    return datePipe.transform(date, 'dd/MM/YYYY HH:mm');
  }

}
