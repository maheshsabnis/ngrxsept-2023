import { Customer } from "../models/customer";

/* Defining the Initial State */
export interface ICustomerState {
  customers:Customer[];
  customer:Customer;
  selectedCustomer:Customer;
}

/* Defining the initial State */

export const initialState: ICustomerState= {
  customers:[],
  customer:new Customer(),
  selectedCustomer:new Customer()
}


/* Store Object */
export interface IAppCategoryState {
   customerStore:ICustomerState
}
