import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { Advert } from '@app/_models/advert';
import { Province } from '@app/_models/province';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    getById(id: string) {
        return this.http.get<Advert>(`${environment.apiUrl}/adverts/${id}`);
    }

    getAdvertsByUserId(id: string) {
        return this.http.get<Advert[]>(`${environment.apiUrl}/adverts/user/${id}`);   
    }

    getAllProvinces() { 
       return this.http.get<Province[]>(`${environment.apiUrl}/adverts/provinces`);       
    }

    createAdvert(advert: Advert) {
        return this.http.post<Advert>(`${environment.apiUrl}/adverts/create`, advert);
    }
    
    updateAdvert(id, params: Advert) {
        return this.http.put<Advert>(`${environment.apiUrl}/adverts/${id}`, params);        
    }
}
