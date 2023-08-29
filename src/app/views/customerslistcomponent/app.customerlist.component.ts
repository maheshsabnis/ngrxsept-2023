import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { selectCustomersList } from 'src/app/selector';
import {Store,select} from '@ngrx/store';
import * as CustomerActions from './../../actions';
import { Router } from '@angular/router';
import {IAppCategoryState} from './../../state'
@Component({
  selector: 'app-cuctomerlist-component',
  templateUrl: './app.customerlist.view.html'
})
export class CustomerListComponent implements OnInit {
  customers:Array<Customer>;
  columns:Array<string>;
  customer:Customer;

  /* Execute the SelectorList */
  customers$ = this._store.pipe(select(selectCustomersList));

  constructor(private _store: Store<IAppCategoryState>, private router:Router) {
    this.customers = new Array<Customer>();
    this.columns = new Array<string>();
    this.customer = new Customer();
  }

  ngOnInit(): void {
    this.columns = Object.keys(this.customer);
    /* Dispatch the Action */
    this._store.dispatch(CustomerActions.getCustomers());
  }

  navigateToEdit(id:number):void {
    // router to edit component with 'id' as parameter
    this.router.navigate(['update', id]);
 }
  deleteRecord(id:number):void{
    /* Dispatch the Delete Actions */
    this._store.dispatch(CustomerActions.deleteCustomer({id:id}));
    this.customers$ = this._store.pipe(select(selectCustomersList));
  }
}
