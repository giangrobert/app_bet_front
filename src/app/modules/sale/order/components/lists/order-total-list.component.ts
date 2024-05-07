import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import {abcForms} from "../../../../../../environments/generals";
import {Attitude} from "../../models/attitude";
import {commonStandaloneImports} from "../../../../../shared/utils/common-imports";
import {AddChickenComponent} from "../form/add-chicken.component";
import {MatDialog} from "@angular/material/dialog";
import {OrderChickenCalculatedComponent} from "../form/order-chicken-calculated.component";
import {MatCardModule} from "@angular/material/card";

@Component({
    selector: 'app-order-total-list',
    standalone: true,
    imports: [
        ...commonStandaloneImports,
        MatCardModule,
    ],
    template: `
        <div class="w-full mx-auto p-3 overflow-hidden">
            <h1>Total: S/{{ calculateTotal() }}</h1>
            <h1>Cantidad {{calculateCantidad()}}</h1>
        </div>
    `,
})
export class OrderTotalListComponent implements OnInit, OnChanges {
    abcForms: any;
    @Input() lists: any = [];
    listsTwo: any = [];
    total: number = 0;
    cantidad: number = 0;


    constructor() {
    }

    ngOnInit() {
        this.abcForms = abcForms;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.calculateTotal();
        if (changes.lists && changes.lists.currentValue) {
            this.listsTwo = changes.lists.currentValue;
        }
    }

    calculateTotal(): number {
        return this.listsTwo.reduce((acc, item) => acc + item.price * item.cantidad, 0);
    }
    calculateCantidad(): number {
        return this.listsTwo.reduce((acc, item) => acc + item.cantidad, 0);
    }
}
