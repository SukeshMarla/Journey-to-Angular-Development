import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../Models/customer';
import { NewCustomer } from '../Models/HttpRequests/newcustomer.requests';
import { CustomerItemResponse } from '../Models/HttpResponses/customer.response';
import { AppConfigService } from './app-config.service';

@Injectable()
export class CustomerService {
  // private Customers: Array<Customer>;
  private IsAddNewSubject: BehaviorSubject<boolean>;
  IsAddNew$: Observable<boolean>;
  private CustomersSubject: Subject<Array<Customer>>;
  Customers$: Observable<Array<Customer>>;
  constructor(private appConfigService: AppConfigService,
              private httpClient: HttpClient) {

    this.IsAddNewSubject = new BehaviorSubject<boolean>(false);
    this.IsAddNew$ = this.IsAddNewSubject.asObservable();
    this.CustomersSubject = new Subject<Array<Customer>>();
    this.Customers$ = this.CustomersSubject.asObservable();
    this.LoadCustomers();
  }

  private LoadCustomers(): void{
    this.httpClient
    .get<Array<CustomerItemResponse>>(`${this.appConfigService.apiUrl}/customers`)
    .pipe(
      map((customerAPIResponse) => {
        return customerAPIResponse.map(
          (customer) => new Customer(customer.firstName, customer.lastName)
        );
      })
    )
    .subscribe((x) => {
      this.CustomersSubject.next(x);
    });
  }
  setAddNew() {
    this.IsAddNewSubject.next(true);
  }

  setList() {
    this.IsAddNewSubject.next(false);
  }

  Save(customer: Customer) {
    const newCustomer: NewCustomer = new NewCustomer(
      customer.FName,
      customer.LName
    );

    this.httpClient
      .post(`${this.appConfigService.apiUrl}/customers`, newCustomer)
      .subscribe(() => {
        this.LoadCustomers();
        this.IsAddNewSubject.next(false);
      });
  }
}
