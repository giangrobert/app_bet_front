import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {abcForms} from "../../../../../../environments/generals";
import {Attitude} from "../../models/attitude";
import {commonStandaloneImports} from "../../../../../shared/utils/common-imports";
import {AddChickenComponent} from "../form/add-chicken.component";
import {MatDialog} from "@angular/material/dialog";
import {OrderChickenCalculatedComponent} from "../form/order-chicken-calculated.component";
import {MatCardModule} from "@angular/material/card";

@Component({
    selector: 'app-order-list',
    standalone: true,
    imports: [
        ...commonStandaloneImports,
        MatCardModule,
    ],
    template: `
        <div
            class="w-full mx-auto p-3 overflow-hidden"
        >
            <div class="scrollable-div-70">
                Items
                @for (l of lists; track lists.id; let idx = $index) {
                    <div class="rounded-xl px-3 mx-auto max-w-md">
                        <div class="flex flex-col space-y-1.5">
                            <div class="flex justify-between items-center">
                                <div class="flex space-x-2">
                                    <h2 class="text-xl font-bold text-gray-800">{{l.name}}</h2>
                                </div>
                                <div class="flex space-x-2">
                                    <button
                                        class="bg-red-100 rounded-full h-8 w-8 flex justify-center items-center hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                        (click)="goDelete(l)">
                                        <mat-icon class="text-rose-500 hover:text-rose-600 cursor-pointer">close</mat-icon>
                                    </button>
                                </div>
                            </div>
                            <div class="flex justify-between items-center">
                                <div class="flex flex-col">
                                    <div>
                                        <span class="text-gray-600 text-sm font-semibold">Costo: </span>
                                        <span class="text-primary-600 text-sm font-bold">S/{{ l.price }}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600 text-sm font-semibold">Total: </span>
                                        <span class="text-primary-600 text-sm font-bold">S/{{ l.cantidad * l.price }}</span>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <button
                                        (click)="dismis(l)"
                                        class="transition duration-300 ease-in-out transform hover:-translate-y-1 bg-primary-500 text-white rounded-full h-7 w-7 flex justify-center items-center shadow-lg">
                                        -
                                    </button>
                                    <input type="text" [(ngModel)]="l.cantidad"
                                           (keydown)="validateNumber($event)"
                                           (input)="checkMinValue(l)"
                                           (ngModelChange)="calculateTotal(l)"
                                           class="w-16 text-lg text-center font-semibold border-2 border-primary-500 rounded-full focus:border-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 outline-none">
                                    <button
                                        (click)="add(l)"
                                        class="transition duration-300 ease-in-out transform hover:-translate-y-1 bg-primary-500 text-white rounded-full  h-7 w-7 flex justify-center items-center shadow-lg">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="dashed-hr">
                } @empty {
                    <div class="w-full text-center text-gray-500">
                        No hay productos
                    </div>
                }
            </div>
            <button

                (click)="goInformationDialog(lists)"
                class="mt-5 bg-primary-500 hover:bg-primary-800 text-white font-bold py-2 px-4 rounded-full w-full flex justify-center items-center">
                <mat-icon class="text-white">payment</mat-icon>
                Payment
            </button>
        </div>
    `,
})
export class OrderListComponent implements OnInit {
    abcForms: any;
    @Input() lists: any = [];
    @Output() eventNew = new EventEmitter<boolean>();
    @Output() eventEdit = new EventEmitter<string>();
    @Output() eventDelete = new EventEmitter<any>();
    @Output() listUpdated = new EventEmitter<any[]>();


    constructor(private _matDialog: MatDialog,) {
    }

    ngOnInit() {
        this.abcForms = abcForms;
    }

    ngOnChanges() {
    }

    public goDelete(l: any): void {
        this.eventDelete.emit(l);
    }

    trackByFn(index: any, item: any) {
        return index;
    }

    calculateTotal(l: any): void {
        l.cantidad = Number(l.cantidad);
        l.total = (l.cantidad * l.price);
        //this.listsEvent.emit(this.lists);
    }


    goInformationDialog(l: any): void {
        if (l) {
            const form = this._matDialog.open(OrderChickenCalculatedComponent);
            form.componentInstance.title = '¿Cuántos ' + l.name + ' se va a vender?' || null;
            form.componentInstance.data = l || null;
            form.afterClosed().subscribe((result: any) => {
                    if (result) {
                        //this.lists.unshift(result);
                        //this.save(result);
                    }
                },
            );
        }
    }
    add(l: any): void {
        if (l.cantidad < 100) {
            l.cantidad += 1;
            this.calculateTotal(l);
        } else {
            console.error('Se ha alcanzado el límite máximo de cantidad');
        }
    }

    dismis(l: any): void {
        if (l.cantidad > 1) {
            l.cantidad -= 1;
            this.calculateTotal(l);
        }
    }



    validateNumber(event: KeyboardEvent) {
        if (event.key === 'Backspace' || event.key ==='ArrowLeft' || event.key ==='ArrowRight' ) {
            return;
        }
        if (event.key < '0' || event.key > '9') {
            event.preventDefault();
        }
    }

    checkMinValue(l:any) {
        if (isNaN(l.cantidad) || l.cantidad < 1 || l.cantidad === null || l.cantidad === undefined || l.cantidad === '') {
           l.cantidad = 1;
            console.log('Cantidad ajustada a 1 porque el valor ingresado no es válido.');
        }
    }

}
