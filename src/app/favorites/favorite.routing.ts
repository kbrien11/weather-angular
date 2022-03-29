import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from '../Location/Location.component';
import { AuthGuardService } from '../shared/auth-guard.service';
import { FavoriteListComponent } from './favorite-list.component';


const routes: Routes = [
    {path: '', component:FavoriteListComponent,canActivate: [AuthGuardService] }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class Routing {}
