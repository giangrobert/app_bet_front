import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {abcForms} from "../../../environments/generals";

@Component({
  selector: 'app-configuration',
  standalone: true,
    imports: [CommonModule, RouterOutlet],
  template: `
      <router-outlet></router-outlet>
  `,
})
export class SaleComponent {
    public title: string = '';
    abcForms:any;
    constructor() {
    }
    ngOnInit() {
        this.title = 'Venta'
        this.abcForms = abcForms;
    }

}
