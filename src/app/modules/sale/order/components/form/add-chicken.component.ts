import {Component, Input, OnInit} from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {abcForms} from "../../../../../../environments/generals";
import {state} from "@angular/animations";
import {commonStandaloneImports} from "../../../../../shared/utils/common-imports";
import {data} from "autoprefixer";

@Component({
    selector: 'app-attitude-new',
    standalone: true,
    imports: [
        ...commonStandaloneImports
    ],
    template: `
        <div class="flex flex-col max-w-240 md:min-w-160 max-h-screen -m-6">
            <div
                class="flex flex-0 items-center justify-between h-16 pr-3 sm:pr-5 pl-6 sm:pl-8 bg-primary text-on-primary"
            >
                <div class="text-lg font-medium">{{ title }}</div>
                <button mat-icon-button (click)="cancelForm()" [tabIndex]="-1">
                    <mat-icon
                        class="text-current"
                        [svgIcon]="'heroicons_outline:x-mark'"
                    ></mat-icon>
                </button>
            </div>
            <form
                class="flex flex-col flex-auto p-6 sm:p-8 overflow-y-auto"
                [formGroup]="form"
            >
                <mat-form-field>
                    <mat-label>Cantidad</mat-label>
                    <input type="number" matInput [formControlName]="'cantidad'"/>
                </mat-form-field>
                <div
                    class="flex flex-col sm:flex-row sm:items-end mt-4 sm:mt-6"
                >
                    <div class="flex space-x-2 items-end mt-4 sm:mt-0">
                        <button
                            class="ml-auto sm:ml-0"
                            [color]="'warn'"
                            mat-stroked-button
                            (click)="cancelForm()"
                        >
                            Cancelar
                        </button>
                        <button
                            class="ml-auto sm:ml-0"
                            [color]="'primary'"
                            [disabled]="form.invalid"
                            mat-stroked-button
                            (click)="saveForm()"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `,
})
export class AddChickenComponent implements OnInit {
    @Input() title: string = '';
    @Input() data: any = '';
    abcForms: any;
    form = new FormGroup({
        cantidad: new FormControl('', [Validators.required]),
    });

    constructor(
        private _matDialog: MatDialogRef<AddChickenComponent>
    ) {
    }

    ngOnInit() {
        this.abcForms = abcForms;
    }

    public saveForm(): void {
        if (this.form.valid) {
            this.data = {
                ...this.data,
                cantidad: this.form.value.cantidad,
            };
        }
        this._matDialog.close(this.data);
    }

    public cancelForm(): void {
        this._matDialog.close('');
    }

    protected readonly state = state;
}
