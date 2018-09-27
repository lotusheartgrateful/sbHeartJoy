import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

//-- In this array is where we setup our paths:
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about/:id', //-- This id is the route parameter
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
