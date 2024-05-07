import {Component, OnInit} from '@angular/core';
import {UserListComponent} from '../components/lists/user-list.component';
import {MatDialog} from '@angular/material/dialog';
import {UserNewComponent} from '../components/form/user-new.component';
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {ConfirmDialogService} from "../../../../shared/confirm-dialog/confirm-dialog.service";
import {UserEditComponent} from "../components/form/user-edit.component";

@Component({
    selector: 'app-user-container',
    standalone: true,
    imports: [UserListComponent],
    template: `
        <app-user-list
            class="w-full"
            [users]="users"
            (eventNew)="eventNew($event)"
            (eventEdit)="eventEdit($event)"
            (eventDelete)="eventDelete($event)"
        ></app-user-list>
    `,
})
export class UserContainersComponent implements OnInit {
    public error: string = '';
    public users: any[] = [];
    public course = new User();

    constructor(
        private _userService: UserService,
        private _matDialog: MatDialog,
        private _confirmDialogService: ConfirmDialogService
    ) {
    }

    ngOnInit() {
        this.get();
    }

    get(): void {
        this._userService.getAll$().subscribe({
                next: (response) => {
                    this.users = response;
                },
                error: (error) => {
                    this.error = error;
                },
            },
        );
    }

    public eventNew($event: boolean): void {
        if ($event) {
            const userForm = this._matDialog.open(UserNewComponent);
            userForm.componentInstance.title = 'Nuevo Valor' || null;
            userForm.afterClosed().subscribe((result: any) => {
                    if (result) {
                        this.save(result);
                    }
                },
            );
        }
    }

    save(data: Object) {
        this._userService.add$(data).subscribe({
            complete: () => {
                this.get();
            },
            error: (error) => {
                this.error = error;
            },
        });
    }
    eventEdit(id: string): void {
        const listById = this._userService.getById$(id)
            .subscribe(async (response) => {
                this.course = response || {};
                this.openModalEdit(this.course);
                listById.unsubscribe();
            });
    }
    openModalEdit(data: User) {
        if (data) {
            const courseForm = this._matDialog.open(UserEditComponent);
            courseForm.componentInstance.title =`Editar <b>${data.name}</b>`;
            courseForm.componentInstance.value = data;
            courseForm.afterClosed().subscribe((result: Object) => {
                if (result) {
                    this.goEdit(data.idValue, result);
                }
            });
        }
    }

    goEdit(id: string, data: Object) {
        this._userService.update$(id, data).subscribe({
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
        this._confirmDialogService.confirmDelete({
            title: 'Eliminar Valor',
            message: '¿Está seguro que desea eliminar al Usuario?',
        }).then(() => {
            this._userService.delete$($event).subscribe({
                error: (error) => {
                    this.error = error;
                    this.get();
                },
            });
        });
    }


}
