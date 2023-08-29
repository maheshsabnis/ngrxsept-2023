import {createEffect,Actions,ofType} from '@ngrx/effects';

//withLatestFrom:Combines the source Observable with other
//Observables to create an Observable whose values
//are calculated from the latest values of each, only when the source emits.
// switchMap:Projects each source value to an
//Observable which is merged in the output Observable,
//emitting values only from the most recently projected Observable.
import {map, switchMap, withLatestFrom} from  'rxjs/operators';


import * as CustomerActions from '../actions';
import {of} from 'rxjs';
import { Injectable } from '@angular/core';
import { CustomerService } from '../services/service';
import { ResponseObject } from '../models/responseobject';

// Store: The Store that will be used to maintain an application state
// select: This will will be used to execute selector to read/query data from store
import { Store, select } from "@ngrx/store";
import {Customer} from './../models/customer';
import {IAppCategoryState} from './../state';
import {selectCustomer, selectCustomersList} from './../selector';

@Injectable()
export class CustomersEffect {
  // since the action calls method from the
  // service that returns Observable, this observable
  // must be subscribe by the effect. Then the effect will read
  // data from Observable and stored it in NGRX Store
  // to call method from service  then subscribe to responser and then to read data from response
  // use switchMap and pipe operators from rxjs/operators
  // .pipe() function of observable
  // thios will create a chain of function executions by executing them in series
  // the result of first can be used in second using switchMap()

  getCustomers$= createEffect(()=>this._action$.pipe(
    ofType(CustomerActions.getCustomers),
    switchMap(()=>this._serv.getCustomers()),
    switchMap((response:ResponseObject)=>of(CustomerActions.getCustomersSuccess({customers:response.record})))
  ));

  getCustomer$ = createEffect(() =>  this._action$.pipe(
    ofType(CustomerActions.getCustomer),
    map(action => action.id), //REading the Inout Parameter
    // execute the selectProductsList selector using 'select' method
    // on the store
    withLatestFrom(this._store.pipe(select(selectCustomersList))), // using the seelctor
    switchMap(([id, customers]) => {
     // console.log(`Customers : ${JSON.stringify(customers)}`);
      const selectedCustomer = customers.filter(cust => cust.CustomerRecordId === +id)[0];
      console.log(`in effect ${id} ${JSON.stringify(selectedCustomer)}`);
      return of(CustomerActions.getCustomerSuccess({customer:selectedCustomer}));
    })
  ));

  postCustomer$ = createEffect(()=> this._action$.pipe(
    ofType(CustomerActions.postCustomer), // monitor the action dispatched from UI
    switchMap((param)=>this._serv.postCustomer(param.customer)), // call method from HTTP Service
    // get suucess data and dispatch the Success Action with the received data
    // so that reducer will update this data in store
    switchMap((response:ResponseObject) => of(CustomerActions.postCustomerSuccess({customer:response.record})))
 ));

 putCustomer$ = createEffect(() => this._action$.pipe(
  ofType(CustomerActions.putCustomer),
  switchMap((param) => this._serv.putCustomer(param.id, param.customer)),
  switchMap((response:ResponseObject) => of(CustomerActions.putCustomerSuccess({customer:response.record})))
));

deleteCustomer$ = createEffect(() => this._action$.pipe(
  ofType(CustomerActions.deleteCustomer),
  switchMap((param) => this._serv.deleteCustomer(param.id)),
  // on true return from the service
  // execute the selector on store get the customer that is deleted using
  // selector from from store and pass it as payload to the
  // success method
  switchMap((response: ResponseObject) => of(CustomerActions.deleteCustomerSuccess({id:response.record.id, isDeleted:response.record.deleted})))
));

  constructor(private _serv:CustomerService,
    private _action$: Actions,
    private _store: Store<IAppCategoryState>
  ){}
}
