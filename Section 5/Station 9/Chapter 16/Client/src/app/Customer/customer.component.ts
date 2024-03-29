// import { Component, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import * as jwt_decode from 'jwt-decode';
// import { Customer } from '../Models/customer';
// import { AuthenticationService } from '../Services/authentication.service';
// @Component({
//   selector: 'customer',
//   templateUrl: './customer.component.html',
// })
// export class CustomerComponent {
//   Customers: Array<Customer>;
//   IsAddNew: boolean;
//   FirstName: string;
//   LastName: string;
//   @ViewChild('myForm') CustomerForm: NgForm;
//   LoginUserFirstName: string = 'DummyFName';
//   constructor(private authenticationService: AuthenticationService) {
//     const decodedToken = jwt_decode(localStorage.token);
//     this.LoginUserFirstName = decodedToken.firstName;

//     this.IsAddNew = false;
//     // this.Reset();
//     this.Customers = new Array<Customer>();
//     this.Customers.push(new Customer('Sukesh', 'Marla'));
//     this.Customers.push(new Customer('Just', 'Compile'));
//     this.Customers.push(new Customer('Ram', 'Lakhan'));
//   }
//   AddNew() {
//     this.IsAddNew = true;
//   }
//   Reset() {
//     // this.FirstName = '';
//     // this.LastName = '';
//     this.CustomerForm.reset();
//   }
//   Save() {
//     this.Customers.push(new Customer(this.FirstName, this.LastName));
//     this.IsAddNew = false;
//     this.Reset();
//   }
//   Cancel() {
//     this.IsAddNew = false;
//     this.Reset();
//   }
//   logout() {
//    this.authenticationService.logout();
//   }
//   // ChangeFirstName(value) {
//   //   this.FirstName = value;
//   // }
//   // ChangeLastName(value) {
//   //   this.LastName = value;
//   // }
// }




import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { Customer } from '../Models/customer';
import { AuthenticationService } from '../Services/authentication.service';
import { CustomerService } from '../Services/customer.service';
import { MultiRndService, RND_TOKEN } from '../Services/multi-rnd.service';
@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  providers: [{provide: CustomerService, useClass: CustomerService}
  ]
})
export class CustomerComponent {
  IsAddNew$: Observable<boolean>;
  Customers$: Observable<Array<Customer>>;
  FirstName: string;
  LastName: string;
  @ViewChild('myForm') CustomerForm: NgForm;

  LoginUserFirstName = 'DummyFName';
  constructor(private customerService: CustomerService,
              private authenticationService: AuthenticationService,
             // @Inject("RND_VALUE")x: Array<MultiRndService>
              @Inject(RND_TOKEN)x: Array<MultiRndService>
              ) {
    const decodedToken = jwt_decode(localStorage.token);
    this.LoginUserFirstName = decodedToken.firstName;

    this.IsAddNew$ = this.customerService.IsAddNew$;
    this.Customers$ = this.customerService.Customers$;
  }
  AddNew() {
    this.customerService.setAddNew();
  }
  Reset() {
    this.CustomerForm.reset();
  }
  Save() {
    this.customerService.Save(new Customer(this.FirstName, this.LastName));
    this.Reset();
  }
  Cancel() {
    this.customerService.setList();
    // this.Reset();
  }
  logout() {
    this.authenticationService.logout();
  }
}
