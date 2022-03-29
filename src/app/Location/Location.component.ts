import { HttpClient, HttpHeaders } from "@angular/common/http";
import { templateJitUrl } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { ILocation } from "./Location";
import { LocationService } from "./LocationService";
import { ActivatedRoute, Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv/ngx-csv';


@Component({
    selector:'pm-location',
    templateUrl: './Location.component.html',
    styleUrls: ['./Location.component.css']
})

export class LocationComponent implements OnInit {
  constructor(private locationService:LocationService, private http:HttpClient, private router:Router,private route:ActivatedRoute){

  }
    pageTitle: String = 'Location List';
    imageWidh: Number = 50;
    imageMargin: Number= 2;
    showImage: boolean = false;
    errorMessage: string = ""
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


     _listFilter: string = "";
    get listFilter(): string {
      return this._listFilter
    }
    set listFilter(value:string){
      this._listFilter = value
      console.log('in setter:', value)
      this.filteredLocations = this.performFilter(value);
    }
    filteredLocations: ILocation[] = [];
 
    locations: ILocation[]  = []

   
     

      toggleImage(): void {
          this.showImage = !this.showImage
      }

      ngOnInit(): void {
        this.locationService.getLocations().subscribe({
          next: locations => {
            this.locations = locations;
            this.filteredLocations = locations
            
          },
          error: err => this.errorMessage = err
        });
      }
    

      performFilter(filterBy:string) :ILocation[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.locations.filter((location:ILocation) =>
        location.city.toLocaleLowerCase().includes(filterBy));
        }


        

        editCity(){
          this.router.navigate(['/locations/:location.id']);
        }
        deleteCity(id:number){
       
        
        this.locationService.deleteLocation(id)
        window.location.reload()
        

        }
        downloadToCSV(){
          var options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'Cities',
            useBom: true,
            noDownload: false,
            headers: ["ID","City", "State"]
          };
         
          new ngxCsv(this.filteredLocations, 'citiesReport', options);
        }

        
}