import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { ProductsDetailComponent } from './products/products-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { LocationComponent } from './Location/Location.component';
import { LocationDetailComponent } from './Location/location-detail.component';
import { LocationAPIInfoComponent } from './location/location-apiinfo.component';
import { AddLocationComponent } from './location/add-location.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { RouteComponent } from './routes/route.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { FavoriteListComponent } from './favorites/favorite-list.component';


@NgModule({
  declarations: [
    AppComponent,ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductsDetailComponent,
    WelcomeComponent,
     LocationComponent,
    LocationDetailComponent,
    LocationAPIInfoComponent,
    AddLocationComponent,
    LoginComponent,
    RegisterComponent,
    RouteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'products', component:ProductListComponent},
      {path:'products/:id', component:ProductsDetailComponent},
      {path: 'locations', component:LocationComponent,canActivate: [AuthGuardService] },
      {path: 'locations/:id', component:LocationDetailComponent,canActivate: [AuthGuardService] },
      {path: 'favorites', loadChildren:()=> import('./favorites/favorite.module').then(m=>m.FavoriteModule)},
      {path:'location/weather/:city',component:LocationAPIInfoComponent,canActivate: [AuthGuardService] },
      {path:'location/addNewCity',component:AddLocationComponent,canActivate: [AuthGuardService] },
      {path:'logout',component:LoginComponent,canActivate: [AuthGuardService]  },
      {path:'location/addNewCity/:city',component:AddLocationComponent,canActivate: [AuthGuardService] },
      {path:'register',component:RegisterComponent},
      {path:'login',component:LoginComponent},
      {path:'welcome',component:WelcomeComponent,canActivate: [AuthGuardService] },
      {path: "", redirectTo:'login', pathMatch: 'full'},
      {path: "**", redirectTo:'login', pathMatch: 'full'}
    ])
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
