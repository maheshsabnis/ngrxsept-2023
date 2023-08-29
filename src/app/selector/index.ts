import {createSelector} from '@ngrx/store';

import {IAppCategoryState,ICustomerState} from  './../state';

export const customersStore  = (state:IAppCategoryState)=>state.customerStore;

export const selectCustomersList = createSelector(
  customersStore, // the store subscription
  (state:ICustomerState) => state.customers // the data to be selecetd fromthe store
);
export const  selectCustomer = createSelector(
  customersStore,// the store subscription
  (state:ICustomerState)=>state.selectedCustomer
);
