import { Component, OnInit } from '@angular/core';

import { FavoriteService } from './favoriteService';

@Component({
  selector: 'pm-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  iconApi: string;
  deletedText: boolean = false
  noFavoriteData: boolean = true
  constructor(private favoriteService: FavoriteService) { }

  favorites: {}
  errorMessage:string = ""
  city :string = ""
  ngOnInit(): void {
 
   const id = sessionStorage.getItem('userId')
   const token = sessionStorage.getItem('token')
    this.favoriteService.getFavorites(id,token).subscribe({
      next: favorites => {
        this.favorites = favorites;
        this.noFavoriteData = false
        this.city = favorites[1]
      
        console.log(typeof(favorites))
      
        
        
      },
      error: err => this.errorMessage = err
    });
  }

roundNumber(x){
console.log(x)
  return Math.ceil(Number(x))
}

deleteFavorite(x){
  this.favoriteService.deleteFavorite(x)
  this.deletedText = true
  setTimeout(()=>{ 
    this.deletedText=false
    window.location.reload()
  
    
},4000)

}




}