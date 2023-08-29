import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import {Store} from '@ngrx/store'
import { Router } from "@angular/router";
import {IAppCategoryState} from './../../state';
import * as CustomerActions from './../../actions';
@Component({
  selector: 'app-addcustomer-component',
  templateUrl: './app.addcustomer.view.html'
})
export class AddCustomerComponent implements OnInit {
  customer:Customer;
  constructor(private _store: Store<IAppCategoryState>, private router:Router) {
    this.customer = new Customer();
  }

  ngOnInit(): void { }
  clear():void {
    this.customer = new Customer();
  }
  save():void {
    // displatch the action to create product
    this._store.dispatch(CustomerActions.postCustomer({customer:this.customer}));
    // wait for 4 seconds and navigate to the ProductList
    setTimeout(()=>{
      this.router.navigate(['']);
    },4000);
  }
}
