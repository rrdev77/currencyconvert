import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-rates',
  templateUrl: 'rates.page.html',
  styleUrls: ['rates.page.scss']
})
export class RatesPage implements OnInit, OnDestroy {

  constructor(private apiService: ApiService) {}
  
  euroNo: number;
  currencyData:any;
  private subscription: Subscription;
  ngOnInit(): void {
   this.getCurrencyData();
  }

  getCurrencyData() {
    if(this.euroNo && this.euroNo > 0) {
      this.subscription = this.apiService.getCurrencyValueAgainstEuro().subscribe((data: any)=> {
        this.currencyData = data.rates;
      });
    } else {
      this.currencyData = null;
    }
 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
