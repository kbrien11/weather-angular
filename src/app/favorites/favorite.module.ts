import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';  
import { FavoriteListComponent } from './favorite-list.component'


import { Routing } from './favorite.routing'


@NgModule({
    imports: [Routing,CommonModule],
    declarations: [FavoriteListComponent]
  })

  export class FavoriteModule{}