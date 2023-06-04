import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})

export class CustomersListComponent implements OnInit {

  customers?: Customer[];

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.retrieveCustomers();
  }

  retrieveCustomers(): void {
    this.customerService.getAll()
      .subscribe({
        next: (data) => {
          this.customers = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCustomers();
  }

  AddCustomer() {
    this.router.navigate(['add']);
  }

  deleteCustomer(id: any) {
    this.customerService.delete(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
}
