/* Creating Reducer */

import {createReducer,on} from '@ngrx/store';
/* Import all actions */
import * as CustomerActions from '../actions';
/* Get the Initial State */
import { initialState, IAppCategoryState } from '../state';


/* Defining the reducers */

export const booksReducers = createReducer(
  initialState,
  on (CustomerActions.getCustomersSuccess,(state,{customers})=>({
    ...state,
    customers
  })),
  on (CustomerActions.getCustomerSuccess,(state,{customer})=>({
    ...state,
    selectedCustomer:customer
  })),
  on(CustomerActions.postCustomerSuccess, (state,{customer})=>({
      ...state,customer
  })),
  on(CustomerActions.putCustomerSuccess, (state,{customer})=>{
     state.customers.filter(cust=>cust.CustomerRecordId!== customer.CustomerRecordId);
     return{
      ...state,customer
     }
  }),
  on(CustomerActions.deleteCustomerSuccess,(state,{isDeleted,id})=>{
     console.log(`is deleted : ${isDeleted} and id = ${id}`);
     if(isDeleted){
     const cust = state.customers.filter(cust=>cust.CustomerRecordId!== id);
     console.log(`The Delete Reducer ${JSON.stringify(cust)}`);
     return {
        ...state,
        customers:cust
      }
     }
    return {
      ...state
    }})
);
