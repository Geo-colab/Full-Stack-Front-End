import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Advert } from '@app/_models/advert';
import { AdvertSearch } from '@app/_models/advert-search';
import { City } from '@app/_models/city';
import { PriceInterval } from '@app/_models/price-interval';
import { Province } from '@app/_models/province';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdvertService {
    private advertSubject: BehaviorSubject<Advert>;
    public advert: Observable<Advert>;


    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.advertSubject = new BehaviorSubject<Advert>(JSON.parse(localStorage.getItem('advert')));
        this.advert = this.advertSubject.asObservable();
    }

    public get advertValue(): Advert {
        return this.advertSubject.value;
    }

    getAllAdverts() {
        return this.http.get<Advert[]>(`${environment.apiUrl}/adverts`);   
    }

    getById(id: string) {
        return this.http.get<Advert>(`${environment.apiUrl}/adverts/${id}`);
    }

    getAdvertsByUserId(id: string) {
        return this.http.get<Advert[]>(`${environment.apiUrl}/adverts/user/${id}`);   
    }

    getAllProvinces() { 
       return this.http.get<Province[]>(`${environment.apiUrl}/adverts/provinces`);       
    }

    getCitiesByProvinceId(id: string) {
        return this.http.get<City[]>(`${environment.apiUrl}/adverts/provinces/cities/${id}`);   
    }

    createAdvert(advert: Advert) {
        return this.http.post<Advert>(`${environment.apiUrl}/adverts/create`, advert);
    }
    
    updateAdvert(id, params: Advert) {
        return this.http.put<Advert>(`${environment.apiUrl}/adverts/${id}`, params);        
    }

    //Price Interval HTTP Methods
    getAllPriceIntervals() { 
        return this.http.get<PriceInterval[]>(`${environment.apiUrl}/adverts/price-intervals`);       
     }

     //SearchAdvert
     getSearchedAdverts(advertSearch: AdvertSearch) {
        return this.http.post<Advert[]>(`${environment.apiUrl}/adverts/search-adverts`, advertSearch);
    }   
     
}
