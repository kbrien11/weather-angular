import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from './LocationService';

@Component({
  selector: 'pm-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  placeHolderCity: string;

  constructor(private locationService:LocationService, private http:HttpClient, private router:Router,private route:ActivatedRoute) { 


  }

  added:boolean = false
  addedText:string = "Location added"
  notAddedText:string = "Location not added or already exists"
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
    const cityName = String(this.route.snapshot.paramMap.get("city"))
    this.placeHolderCity = cityName
  }

  addNewCity() {
    let url = 'http://localhost:8080/cities';
    

    this.http.post(url, {
      city:this._city,
      state:this._state
      
    }).toPromise().then((data:any) =>{
      this.added = true
      setTimeout(()=>{                           // <<<---using ()=> syntax
        this.router.navigate(['/locations']);
    }, 3000);
      console.log(data)
    }

    )
  }



}
