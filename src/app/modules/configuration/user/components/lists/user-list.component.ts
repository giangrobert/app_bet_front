import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {abcForms} from "../../../../../../environments/generals";
import {User} from "../../models/user";
import {commonStandaloneImports} from "../../../../../shared/utils/common-imports";
import {UserComponent} from "../../../../../layout/common/user/user.component";

@Component({
    selector: 'app-user-list',
    standalone: true,
    imports: [
        ...commonStandaloneImports,
        UserComponent,
    ],
    template: `
        <div
            class="w-full mx-auto p-6 rounded overflow-hidden shadow-lg bg-white dark:bg-transparent"
        >
            <div
                class="flex justify-between items-center mb-2 bg-primary-100 bg-blend-darken dark:bg-transparent dark:border p-4 rounded"
            >
                <h2 class="text-2xl font-bold">
                    Lista de <span class="text-primary">Usuarios</span>
                </h2>
                <button mat-flat-button [color]="'primary'" (click)="goNew()">
                    <mat-icon [svgIcon]="'heroicons_outline:plus'"></mat-icon>
                    <span class="ml-2">Nuevo Usuario</span>
                </button>
            </div>
            <div class="w-full p-2">
                <table class="w-full stylish-table">
                    <thead>
                    <tr class="bg-primary-600 text-white">
                        <th
                            class="text-center px-1 border-r"
                        >
                            #
                        </th>
                        <th
                            class="text-center px-5 border-r"
                        >
                            Nombre
                        </th>
                        <th class="text-center px-5 border-r">
                            Apellido
                        </th>
                        <th class="text-center px-5 border-r">
                            Correo
                        </th>
                        <th class="text-center px-5 border-r">
                            Rol
                        </th>
                        <th class="text-center px-5 border-r">
                            Fecha Creación
                        </th>
                        <th class="table-header text-center">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-transparent">
                        @for (u of users; track u.id; let idx = $index) {
                            <tr class="hover:bg-gray-100 dark:hover:bg-transparent" [ngClass]="{
                          'bg-primary-50': idx % 2 === 0,
                          'dark:bg-transparent': idx % 2 === 0
                        }">
                                <td data-label="#" class="text-center border-b text-sm border-r">
                                    {{ idx + 1 }}
                                </td>
                                <td data-label="Nombre" class="text-start border-b text-sm border-r">
                                    {{ u.name }}
                                </td>
                                <td data-label="Nombre" class="text-start border-b text-sm border-r">
                                    {{ u.lastname }}
                                </td>
                                <td data-label="Correo" class="text-start border-b text-sm border-r">
                                    {{  u.email }}
                                </td>
                                <td data-label="Teléfono" class="text-start border-b text-sm border-r">
                                    {{  u.role }}
                                </td>
                                <td data-label="Dirección" class="text-start border-b text-sm border-r">
                                    {{  u.created_at | date:'medium' }}
                                </td>
                                <td data-label="Acciones"
                                    class="text-center border-b text-sm"
                                >
                                    <div class="flex justify-center space-x-3">
                                        <mat-icon
                                            class="text-amber-400 hover:text-amber-500 cursor-pointer"
                                            (click)="goEdit(u.idValue)"
                                        >edit
                                        </mat-icon
                                        >

                                        <mat-icon
                                            class="text-rose-500 hover:text-rose-600 cursor-pointer"
                                            (click)="goDelete(u.idValue)"
                                        >delete_sweep
                                        </mat-icon
                                        >
                                    </div>
                                </td>
                            </tr>
                        } @empty {
                            <tr>
                                <td colspan="6" class="text-center">
                                    Sin Contenido
                                </td>
                            </tr>
                        }


                    </tbody>
                </table>
            </div>
        </div>
    `,
})
export class UserListComponent implements OnInit {
    abcForms: any;
    @Input() users: any[] = [];
    @Output() eventNew = new EventEmitter<boolean>();
    @Output() eventEdit = new EventEmitter<string>();
    @Output() eventDelete = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit() {
        this.abcForms = abcForms;
    }
    ngOnChanges() {
    }

    public goNew() {
        this.eventNew.emit(true);
    }

    public goEdit(id: string): void {
        this.eventEdit.emit(id);
    }

    public goDelete(id: string): void {
        this.eventDelete.emit(id);
    }

}
