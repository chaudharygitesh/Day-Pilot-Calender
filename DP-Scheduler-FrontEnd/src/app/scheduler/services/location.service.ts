import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ProvidersByLocation, locationAPIURL, ProvidersByLocationInToggel, BookedAppointments } from '../../../Environvent/ApiURL' 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = locationAPIURL.apiUrl;
  private ProvidersURL = ProvidersByLocation.apiUrl
  private providersInToggle = ProvidersByLocationInToggel.apiUrl
  private bookedAppointments = BookedAppointments.apiUrl

  constructor(private http: HttpClient ) { }

  // Get Locations 
  GetLocations():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  // Providers By Locations
  ProvidersByLocations(dayOfWeek: any, locationIds: number[]):Observable<any>{
    let params = new HttpParams().set('dayOfWeek', dayOfWeek);
    // Append each locationId to the params
    locationIds.forEach(id => {
      params = params.append('locationIds', id.toString());
    });    
    return this.http.get<any>(this.ProvidersURL, { params });
  }

  //Providers by locations in toggle
  providerLocationInToggle(dayOfWeek: any): Observable<any[]> {
    const url = `${this.providersInToggle}?dayOfWeek=${dayOfWeek}`;
    return this.http.get<any[]>(url);
  }

  // Booked Appointments
  BookedAppointments(selectedDate:any, LocationIds:number[]):Observable<any>{
    let params = new HttpParams().set('selectedDate', selectedDate);
    LocationIds.forEach(id =>{
      params = params.append('LocationIds', id.toString());
    });
    return this.http.get<any>(this.bookedAppointments, {params});
  }
}
