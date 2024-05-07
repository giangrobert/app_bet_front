import {Component, OnInit} from '@angular/core';
import {OrderListComponent} from '../components/lists/order-list.component';
import {MatDialog} from '@angular/material/dialog';
import {AttitudeNewComponent} from '../components/form/attitude-new.component';
import {AttitudeService} from "../services/attitude.service";
import {Attitude} from "../models/attitude";
import {ConfirmDialogService} from "../../../../shared/confirm-dialog/confirm-dialog.service";
import {AttitudeEditComponent} from "../components/form/attitude-edit.component";
import {MatCardModule} from "@angular/material/card";
import {StoreChickenListComponent} from "../components/lists/store-chicken-list.component";
import {AddChickenComponent} from "../components/form/add-chicken.component";
import {lists} from "../../../../mock-api/apps/scrumboard/data";
import {JsonPipe} from "@angular/common";
import {OrderTotalListComponent} from "../components/lists/order-total-list.component";

@Component({
    selector: 'app-attitude-container',
    standalone: true,
    imports: [OrderListComponent, MatCardModule, StoreChickenListComponent, JsonPipe, OrderTotalListComponent],
    template: `
        <div class="flex flex-col md:flex-row justify-center mx-auto w-full">
            <div class="md:w-12/12 p-4">
                <h2 class="text-2xl font-bold">Calculadora</h2>
                <app-store-chicken-list
                    (eventNewChicken)="eventNewChicken($event)"
                ></app-store-chicken-list>
            </div><div class="fixed top-15 right-10 w-40 p-4 dark bg-primary-800 shadow-lg rounded-lg">
            <app-order-total-list [lists]="lists"></app-order-total-list>
        </div>
            @if (lists.length > 0) {
                <div class="md:w-4/12 p-4 bg-white dark:bg-transparent">
                    <h2 class="text-2xl font-bold p-3">Orden de Compra</h2>
                    <app-order-list
                        [lists]="lists"
                        (eventNew)="eventNew($event)"
                        (eventEdit)="eventEdit($event)"
                        (eventDelete)="eventDelete($event)"
                    ></app-order-list>
                </div>
            }
        </div>


    `,
})
export class OrderContainersComponent implements OnInit {
    public error: string = '';
    public lists: any[] = [];
    public attitude = new Attitude();

    constructor(
        private _attitudeService: AttitudeService,
        private _matDialog: MatDialog,
        private _confirmDialogService: ConfirmDialogService
    ) {
    }
    ngChange() {
        this.lists = lists;
    }

    ngOnInit() {
        this.get();
    }

    get(): void {
        this._attitudeService.getAll$().subscribe({
                next: (response) => {
                    this.lists = response;
                },
                error: (error) => {
                    this.error = error;
                },
            },
        );
    }

    public eventNew($event: boolean): void {
        if ($event) {
            const userForm = this._matDialog.open(AttitudeNewComponent);
            userForm.componentInstance.title = 'Nuevo Actitud' || null;
            userForm.afterClosed().subscribe((result: any) => {
                    if (result) {
                        this.save(result);
                    }
                },
            );
        }
    }

    save(data: Object) {
        this._attitudeService.add$(data).subscribe({
            complete: () => {
                this.get();
            },
            error: (error) => {
                this.error = error;
            },
        });
    }
    eventEdit(id: string): void {
        const listById = this._attitudeService.getById$(id)
            .subscribe(async (response) => {
                this.attitude = response || {};
                this.openModalEdit(this.attitude);
                listById.unsubscribe();
            });
    }
    openModalEdit(data: Attitude) {
        if (data) {
            const courseForm = this._matDialog.open(AttitudeEditComponent);
            courseForm.componentInstance.title =`Editar <b>${data.name}</b>`;
            courseForm.componentInstance.value = data;
            courseForm.afterClosed().subscribe((result: Object) => {
                if (result) {
                    this.goEdit(data.idAttitude, result);
                }
            });
        }
    }

    goEdit(id: string, data: Object) {
        this._attitudeService.update$(id, data).subscribe({
            complete: () => {
                this.get();
            },
            error: (error) => {
                this.error = error;
                this.get();
            },
        });
    }

    eventDelete($event: any) {
       /* this._confirmDialogService.confirmDelete({
            title: 'Eliminar Actitud',
            message: '¿Está seguro que desea eliminar la actitud?',
        }).then(() => {
            this._attitudeService.delete$($event).subscribe({
                complete: () => {
                    this.get();
                },
                error: (error) => {
                    this.error = error;
                    this.get();
                },
            });
        });*/
        this.lists = this.lists.filter((item) => item.id !== $event.id);
    }
    eventNewChicken($event: any) {
        if ($event) {
            const exist = this.lists.find((item) => item.id === $event.id);
            if (exist) {
                exist.cantidad = exist.cantidad + 1;
                return;
            }else{
                $event.cantidad = 1;
                $event.total = $event.price * $event.cantidad;
                this.lists.unshift($event);
            }
            /*const form = this._matDialog.open(AddChickenComponent);
            form.componentInstance.title = '¿Cuántos '+$event.name+' se va a vender?' || null;
            form.componentInstance.data = $event || null;
            form.afterClosed().subscribe((result: any) => {
                    if (result) {

                        //this.save(result);
                    }
                },
            );*/
        }
    }
}
