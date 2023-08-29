import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './views/customerslistcomponent/app.customerlist.component';
import { AddCustomerComponent } from './views/addcustomercomponent/app.addcustomer.component';
import { UpdateCustomerComponent } from './views/updatecustomercomponent/app.updatecustomer.component';

const routes: Routes = [
  {path:'',component:CustomerListComponent},
  {path:'add', component:AddCustomerComponent},
  {path:'update/:id', component:UpdateCustomerComponent},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
