import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';

import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-charts',
  templateUrl: 'charts.page.html',
  styleUrls: ['charts.page.scss']
})
export class ChartsPage implements OnInit, OnDestroy {
  options: any = {
  
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
  
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
       // pointStart: new Date().getTimezoneOffset()
      }
    },
  
    series: [{
      name: 'Installation',
      data: []
    }],
  
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };
  constructor(private apiService: ApiService) {}
  currencyData:any;
  private subscription: Subscription;
  selectedCurrency: string = 'GBP'
  ngOnInit(): void {
   this.getCurrencyData();
   this.getOneWeekDaysInArray();
   Highcharts.chart('container', this.options);
  }

  getCurrencyData() {
      this.subscription = this.apiService.getCurrencyValueAgainstEuro().subscribe((data: any)=> {
        this.currencyData = data.rates;
      });
    } 

    currencyChange(currency) {
     let fullData = []; 
     let currencyUrls = [];
     this.getOneWeekDaysInArray().forEach(date => {
       let url = `https://api.ratesapi.io/api/${date}?symbols=${currency}`;
       currencyUrls.push(url);
     });
     
     this.apiService.getOneWeekDataForChart(currencyUrls).subscribe((data)=> {
       data.forEach((value:any)=> {
        Object.keys(value.rates).forEach(function(key) {
          fullData.push(value.rates[key]);
        })
       });
       this.options.series[0].data = fullData;
       Highcharts.chart('container', this.options);
     });
    }

    getOneWeekDaysInArray() {
      let days = new Date();
      let dateArray = [];
      for(let i=0; i<7; i++) {
        dateArray.push(days.getFullYear()+'-'+days.getMonth()+'-'+(days.getDate()-i))
      }
     return  dateArray;
    }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
