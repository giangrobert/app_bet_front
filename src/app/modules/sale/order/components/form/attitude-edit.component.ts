import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Attitude} from "../../models/attitude";
import {abcForms} from "../../../../../../environments/generals";
import {commonStandaloneImports} from "../../../../../shared/utils/common-imports";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-attitude-edit',
  standalone: true,
  imports: [
      ...commonStandaloneImports
  ],
  template: `
      <div class="flex flex-col max-w-240 md:min-w-160 max-h-screen -m-6">
          <div
              class="flex flex-0 items-center justify-between h-16 pr-3 sm:pr-5 pl-6 sm:pl-8 bg-primary text-on-primary"
          >
              <div class="text-lg font-medium" [innerHTML]="title"></div>
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
                  <mat-label>Nombre</mat-label>
                  <input type="text" matInput [formControlName]="'name'" />
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
  `
})
export class AttitudeEditComponent implements OnInit {
    form = new FormGroup({
        name: new FormControl('', [Validators.required]),
    });
  @Input() title: string = '';
  @Input() value = new Attitude();
  abcForms: any;

  constructor(
      private _matDialog: MatDialogRef<AttitudeEditComponent>,
  ) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    if (this.value) {
      this.form.patchValue({
          name: this.value.name,
      });
    }
  }

  public saveForm(): void {
    if (this.form.valid) {
      this._matDialog.close(this.form.value);
    }
  }

  public cancelForm(): void {
    this._matDialog.close('');
  }
}
