import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentCustomer: Customer = {
    first_name: '',
    last_name: '',
    address: '',
    age: undefined,
    active: false
  };

  submitted:boolean = false;

  message = '';

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
      if(!this.viewMode) {
        this.message = '';
        this.getCustomer(this.route.snapshot.params["id"]);
      }
  }

  getCustomer(id: string): void {
    this.customerService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCustomer = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  editCustomer(isValid: any): void {
    this.submitted = true;
    if(isValid){
      this.message = '';

      this.customerService.update(this.currentCustomer.id, this.currentCustomer)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.message = res.message ? res.message : 'This customer was updated successfully!';
          },
          error: (e) => console.error(e)
        });

        this.router.navigate(['/'])
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
