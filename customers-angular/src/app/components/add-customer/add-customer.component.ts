import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit{

  addCustomerForm: customerForm = new customerForm();

  @ViewChild("customerForm")
  customerForm!: NgForm;

  customer: Customer = {
    first_name: '',
    last_name: '',
    address: '',
    age: undefined,
    active: false
  }

  submitted:boolean = false;

  constructor(private customerService: CustomerService, private router: Router) {  }

  ngOnInit(): void {
  }

  saveCustomer(isValid: any): void {
    this.submitted = true;
    if(isValid){
      const data = {
        first_name: this.customer.first_name,
        last_name: this.customer.last_name,
        address: this.customer.address,
        age: this.customer.age,
        active: this.customer.active
      };
  
      this.customerService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
          },
          error: (e) => console.error(e)
        });
  
      this.router.navigate(['/'])
    }
  }

  newCustomer(): void {
    this.submitted = false;
    this.customer = {
      first_name: '',
      last_name: '',
      address: '',
      age: 0,
      active: false
    }
  }
}

export class customerForm {
  first_name: string = "";
  last_name: string = "";
  address: string = "";
  age: number = 0;
  active: boolean = false;
}