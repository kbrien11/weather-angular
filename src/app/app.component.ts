import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { LocationService } from './Location/LocationService';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand'>{{pageTitle}}</a>
        <ul class='nav nav-pills'>
          <li *ngIf = 'auth.isLoggedIn()'><a class='nav-link' routerLinkActive='active' [routerLink]="['/welcome']">Home</a></li>
          <li *ngIf = 'auth.isLoggedIn()' ><a class='nav-link' routerLinkActive='active' [routerLink]="['/locations']">Locations</a></li>
          <li *ngIf = 'auth.isLoggedIn()' ><a class='nav-link' routerLinkActive='active' [routerLink]="['/favorites']">Favorites</a></li>
          <li *ngIf = 'auth.isLoggedIn()' ><a class='nav-link' routerLinkActive='active' [routerLink]="['/location/addNewCity']">Add City</a></li>
          <li *ngIf = '!auth.isLoggedIn()'><a class='nav-link' routerLinkActive='active' [routerLink]="['/register']">Register</a></li>
          <li *ngIf = '!auth.isLoggedIn()'><a class='nav-link' routerLinkActive='active' [routerLink]="['/login']">Login</a></li>
          <li *ngIf = 'auth.isLoggedIn()' ><a   class='nav-link' routerLinkActive='active' [routerLink]="['/logout']">Logout</a></li>
          <li *ngIf = 'auth.isLoggedIn()' >  <input tpe = 'text'
          [(ngModel)] = 'city'
          placeholder="Search.."
          
         /><span><button class="weather-button"
          (click)='searchCity(city)'
          style='width:80px'>
          <a [routerLink]="['/location/weather', city]">
            
          <i class="fas fa-search-plus" style="font-size:34px" ></i>
          </a>
  </button> </span>

          </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public auth: AuthService, private locationService:LocationService){
    
  }
  pageTitle = '';
   token =  ""
   city = ""
 
  ngOnInit(): void {
    console.log(this.city)
    if(this.auth.isLoggedIn()){
    
      this.token = sessionStorage.getItem('token')
      
  }
  else{
    
    this.token = ""
  }
   
  }

  showRoute(){
    setTimeout(()=>{                           // <<<---using ()=> syntax
     this.auth.isLoggedIn()
  }, 5000);
  }

 searchCity(x){
   this.locationService.weatherInfo(x)
   window.location.reload()
 }

}
