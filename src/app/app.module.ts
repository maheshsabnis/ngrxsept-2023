import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CustomerListComponent } from './views/customerslistcomponent/app.customerlist.component';
import { AddCustomerComponent } from './views/addcustomercomponent/app.addcustomer.component';
import { UpdateCustomerComponent } from './views/updatecustomercomponent/app.updatecustomer.component';
import { MainNgRxComponent } from './views/app.mainngrx.component';

// importing object for NGRX
// StoreModule: Represent the NGRX Store
import { StoreModule } from '@ngrx/store';
// EffectsModule: monitor the execution of effects
import {EffectsModule} from '@ngrx/effects'
// simulation
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { mainReducers } from './reducers';
import { CustomersEffect } from './effects';

@NgModule({
  declarations: [
    AppComponent, CustomerListComponent, AddCustomerComponent,UpdateCustomerComponent, MainNgRxComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule,
     // configure all reducers at global level so that
    // all actions are monitored
    StoreModule.forRoot(mainReducers),
    // all effects for Async operations are initialized at root level
    EffectsModule.forRoot([CustomersEffect]),
    StoreDevtoolsModule.instrument({
      name: 'The NGRX app',

    })
  ],
  providers: [],
  bootstrap: [MainNgRxComponent]
})
export class AppModule { }
