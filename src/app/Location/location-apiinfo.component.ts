import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from './LocationService';
import {formatDate} from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pm-location-apiinfo',
  templateUrl: './location-apiinfo.component.html',
  styleUrls: ['./location-apiinfo.component.css']
})
export class LocationAPIInfoComponent implements OnInit {
  loading: boolean = false
  addedToFavoriteText: boolean;
  favoriteErrorText: boolean;

  constructor(private locationService:LocationService,private router:Router,private route:ActivatedRoute,private http:HttpClient) { }
  errorMessage: boolean = false
  weatherInfo: {}
  weatherData : boolean = false
  city :String = ""
  date : String = ""
  wind = 0
  iconApi = ""
  temp = 0
  userid :string = ""
  
  ngOnInit(): void {
    this.loading = true   
    console.log(sessionStorage.getItem('favorite'))
    const id = sessionStorage.getItem('userId')
    this.userid = id
    setTimeout(()=>{                 
             // <<<---using ()=> syntax
      const cityName = String(this.route.snapshot.paramMap.get("city"))
      this.city = cityName
      this.errorMessage = false
      console.log(this.errorMessage)
      this.locationService.weatherInfo(cityName).subscribe({
        next: weatherInfo => {
          console.log(weatherInfo)
          this.weatherData = true
          this.date = formatDate(new Date(), 'MM/dd/yyyy hh:mm:ss', 'en');
          this.weatherInfo = weatherInfo;
          this.iconApi = (`http://openweathermap.org/img/w/${weatherInfo[6]}.png`)
          this.temp =  Math.ceil(weatherInfo[3])
          this.wind =  Math.ceil(weatherInfo[4])
          this.loading  =false
          if(weatherInfo[3]){
            this.errorMessage = false
            this.weatherData = true
          }
          else{
            this.errorMessage = true
            this.weatherData = false
          }
          console.log(this.errorMessage)
        }
       
      })
    },2000)  
 
  }
  onBackToLocations(): void {
    this.router.navigate(['/locations']);
  }

  addToFavorites(x,y){
    const token = sessionStorage.getItem('token')
      
    let url = `http://localhost:8080/cities/update/${token}`;
    

    this.http.put(url, {
      city:x,
      account:y
      
    }).toPromise().then((data:any) =>{
      console.log(data)
      if(data !=null){
        this.addedToFavoriteText = true
        this.favoriteErrorText = false
        setTimeout(()=>{                           // <<<---using ()=> syntax
         this.addedToFavoriteText = false
     }, 3000);
      }
      else{
        this.addedToFavoriteText = false
        this.favoriteErrorText = true
        setTimeout(()=>{                           // <<<---using ()=> syntax
          this.favoriteErrorText = false
      }, 3000);
      }
    }

    )


 
  }
}
