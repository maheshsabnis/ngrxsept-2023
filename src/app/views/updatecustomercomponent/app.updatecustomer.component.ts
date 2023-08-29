import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { ActivatedRoute,Router } from '@angular/router';
import {Store,select} from '@ngrx/store';
import {IAppCategoryState} from './../../state';
import {selectCustomer} from './../../selector';
import * as CustomerActions from './../../actions';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-updatecustomer-component',
  templateUrl: './app.updatecustomer.view.html'
})
export class UpdateCustomerComponent implements OnInit {
  customer:Customer;

   customer$:Observable<Customer>;


    id:number;

  constructor(private _store:Store<IAppCategoryState>, private router:Router, private act:ActivatedRoute) {
    this.customer = new Customer();
    this.id = 0;
    this.customer$ = new Observable<Customer>();
  }

  ngOnInit(): void {
     this.act.params.subscribe((params)=>{
       this.id = params['id'];
      /* Dispatch the Action */
      this._store.dispatch(CustomerActions.getCustomer({id:this.id}));
      /* Execute the SelectorList */
      this.customer$ = this._store.pipe(select(selectCustomer));
      this.customer$.subscribe((c)=>{
        this.customer = Object.assign({},c);
      });
     });


  }
  clear():void {
    this.customer = new Customer();
  }
  save():void {
     // displatch the action to create product
    this._store.dispatch(CustomerActions.putCustomer({id:this.customer.CustomerRecordId ,customer:this.customer}));
    // wait for 4 seconds and navigate to the ProductList
    setTimeout(()=>{
      this.router.navigate(['']);
    },4000);
  }
}
