import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { ResponseObject } from '../models/responseobject';

@Injectable({providedIn: 'root'})
export class CustomerService {
  private url:string;
  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:9080';
  }

    getCustomers(): Observable<ResponseObject> {
      const response:Observable<ResponseObject> = this.httpClient.get<ResponseObject>(`${this.url}/api/Customers`);
      return response;
    }
    postCustomer(customer:Customer):Observable<ResponseObject> {
      console.log(`Customer in Server ${JSON.stringify(customer)}`);
      const response:Observable<ResponseObject> = this.httpClient.post<ResponseObject>(`${this.url}/api/Customers`, customer, {
        headers:{
          'Content-Type':'application/json'
        }
      });
      return response;
    }
    putCustomer(id:number,customer:Customer):Observable<ResponseObject> {
      const response:Observable<ResponseObject> = this.httpClient.put<ResponseObject>(`${this.url}/api/Customers/${id}`, customer, {
        headers:{
          'Content-Type':'application/json'
        }
      });
      return response;
    }
    deleteCustomer(id:number):Observable<ResponseObject> {
      const response:Observable<ResponseObject> = this.httpClient.delete<ResponseObject>(`${this.url}/api/Customers/${id}`);
      return response;
    }

}
