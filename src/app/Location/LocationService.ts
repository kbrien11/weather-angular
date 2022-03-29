import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

import {catchError, map, tap} from 'rxjs/operators'
import { ILocation } from "./Location";

@Injectable({
    providedIn: 'root'
})
export class LocationService{
  
  private productUrl = 'http://localhost:8080/getCities';
  
    constructor( private http:HttpClient){
        
    }


    getLocations(): Observable<ILocation[]> {
        return this.http.get<ILocation[]>(this.productUrl)
          .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
            
          );
      }
      weatherInfo(cityName:String): Observable<{}> {
        return this.http.get<{}>(`http://localhost:8080/${cityName}`)
          .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
            
          );
      }

      currentCityLatAndLon(lat:number,lon:number):Observable<{}>{
        console.log(lat,lon)
        return this.http.get<{}>(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=27b3ec19c7d34c1bcca082098b7a60a7`)
          .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
            
          );
      }

      getLocation(id: number): Observable<ILocation | undefined> {
        return this.getLocations()
          .pipe(
            map((locations: ILocation[]) => locations.find(p => p.id === id))
          );
      }

     

       options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '**',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
          'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
        }),
       
      }

      deleteLocation(id:number){
        let url = `http://localhost:8080/cities/delete/${id}`;
        

        this.http.post(url, {
         
          
        }).toPromise().then((data:any) =>{
         
          console.log(data.text)
        }

        )
      }

      addToFavorites(x,y){
        const token = sessionStorage.getItem('token')
        sessionStorage.removeItem("favorite")
        console.log(x,y)
        let url = `http://localhost:8080/cities/update/${token}`;
        

        this.http.put(url, {
          city:x,
          account:y
          
        }).toPromise().then((data:any) =>{
          console.log(data)
          if(data !=null){
            console.log('adding to favorites')
            sessionStorage.setItem('favorite','true')
          }
          else{
            console.log("city is already in favorites")
            sessionStorage.setItem('favorite','false')
          }
        }

        )
      }
      
      

      private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      }
  
}