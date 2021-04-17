import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {

    }

    getCurrencyValueAgainstEuro() {
       return this.http.get('https://api.ratesapi.io/api/latest');
    }

    getOneWeekDataForChart(urls) {
        let observable = [];
        urls.forEach(url => {
            observable.push(this.http.get(url));
        });
       return forkJoin(observable);
    }

}