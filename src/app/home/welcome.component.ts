import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../Location/LocationService';

@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {


  constructor(private locationService:LocationService,private router:Router,private route:ActivatedRoute){
  }
 
  location = {};
  errorMessage: string = ""
  weatherInfo: {}

  iconApi = ""
  temp = 0

ngOnInit() {

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      this.location = position.coords;
      this.locationService.currentCityLatAndLon(this.location['latitude'],this.location['longitude'])
      .subscribe({
        next: data => {

          this.router.navigate([`/location/weather/${data['name']}`])
          
          // this.locationService.weatherInfo(data['name']).subscribe({
          //   next: weatherInfo => {
          //     console.log(weatherInfo)
          //      this.weatherInfo = weatherInfo;
          //      this.iconApi = (`http://openweathermap.org/img/w/${weatherInfo[6]}.png`)
          //      this.temp =  Math.ceil(weatherInfo[3])
              
              
              
          //   },
          //   error: err => this.errorMessage = err
          // });
        },
        error: err => this.errorMessage = err
      });
    
    });

   
 }

 
  
}



}


