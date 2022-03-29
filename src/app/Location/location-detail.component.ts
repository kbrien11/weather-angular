import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILocation } from "./Location";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LocationService } from './LocationService';
@Component({
  selector: 'pm-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private locationService:LocationService,private http:HttpClient) { }

  pageTitle: string = "welcome to location Detail page"
  location :ILocation|undefined
  edited:boolean = false
  editedText : String = "has been edited"
  errorMessage:string = ""
  private _city: string = ""
  get city():string{
    return this._city
  }
  set city(value:string){
    this._city = value
  }
  private _state: string = ""
  get state():string{
    return this._state
  }
  set state(value:string){
    this._state = value
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.pageTitle += `:${id}`
    if(id){
      this.getLocation(id)
    }
    
  }

  
  getLocation(id:number){
    this.locationService.getLocation(id).subscribe({
      next:location=> this.location = location,
      error: err=> this.errorMessage = err
    })
  }

  editCity(id:number){
    let url = `http://localhost:8080/cities/edit/${id}`;
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'responseType': 'text'
            }),
          };

          this.http.post(url, {
            city:this._city,
            state:this._state
            
          }).toPromise().then((data:any) =>{
            this.edited = true
            setTimeout(()=>{                           // <<<---using ()=> syntax
              this.router.navigate(['/locations']);
          }, 3000)
          }

          )
  }

  onBack(): void {
    this.router.navigate(['/locations']);
  }

}
