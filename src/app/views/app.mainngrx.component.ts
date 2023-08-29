
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainngrx-component',
  template:`
      <h1>The NgRx App</h1>
      <div class="container">
      <table class="table table-bordered table-warning">
          <tbody>
            <tr>
              <td>
                <a [routerLink]="['']">Customer List</a>
              </td>
              <td>
                <a [routerLink]="['add']">Add Customer</a>
              </td>
            </tr>
          </tbody>
      </table>

      <hr>
    <router-outlet></router-outlet>
</div>
  `
})
export class MainNgRxComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
