import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductspageComponent } from './components/productspage/productspage.component';

const routes: Routes = [{path:'',component:ProductspageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
