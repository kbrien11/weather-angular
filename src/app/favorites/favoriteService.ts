







import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

import {catchError, map, tap} from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})
export class FavoriteService{
  
    constructor( private http:HttpClient){
        
    }


    getFavorites(id,token): Observable<Object> {
        return this.http.get<Object>(`http://localhost:8080/cities/favorite/${id}/${token}`)
          .pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
            
          );
      }

      deleteFavorite(id:number){
        let url = `http://localhost:8080/cities/favorite/${id}`;
        

        this.http.post(url, {
         
          
        }).toPromise().then((data:any) =>{
         
          console.log(data.text)
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
  