/* Defining Actions */
import {createAction, props} from '@ngrx/store';
import { Customer } from '../models/customer';

export const getCustomers = createAction(
  '[Customers] Get Products' /* Action Type */
);

/* The success action */
export const getCustomersSuccess = createAction(
  '[Customers] Get Products Success', /* Action Type */
  props<{customers:Customer[]}>()
);


export const getCustomer = createAction(
  '[Customer] Get Product', /* Action Type */
  props<{id:number}>()
);

/* The success action */
export const getCustomerSuccess = createAction(
  '[Customer] Get Product Success', /* Action Type */
  props<{customer:Customer}>()
);

export const postCustomer = createAction(
  `[PostCustomer] New Customer`,
  props<{customer:Customer}>()
);
export const postCustomerSuccess = createAction(
  `[PostCustomer] New Customer Success`,
  props<{customer:Customer}>()
);

export const putCustomer = createAction(
  `[PutCustomer] Update Customer`,
  props<{id:number,customer:Customer}>()
);
export const putCustomerSuccess = createAction(
  `[PostCustomer] Update Customer Success`,
  props<{customer:Customer}>()
);

export const deleteCustomer = createAction(
  `[DeleteCustomer] Delete Customer`,
  props<{id:number}>()
);
export const deleteCustomerSuccess = createAction(
  `[DeleteCustomer] Delete Customer Success`,
  props<{isDeleted:boolean, id:number}>()
);
