import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MaterialModule } from './material.module';
import { PrincipalLayoutComponent } from './layout/principal-layout/principal-layout.component';
import { NoLayoutComponent } from './layout/no-layout/no-layout.component';
import { DialogComponent } from './dialog/dialog.component';
import { AlertModule } from './alert';
import { HttpClientModule } from '@angular/common/http';
import { FormlyModule } from '@ngx-formly/core';
import { dateField } from './formly-types/date.field';
import { FormlyFieldButton } from './formly-types/field-button.component';
@NgModule({
  declarations: [
    PrincipalLayoutComponent,
    NoLayoutComponent,
    DialogComponent,
    FormlyFieldButton,
    dateField,
  ],
  imports: [
    AlertModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FormlyMaterialModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      types: [
        {
          name: 'password',
          extends: 'input',
          defaultOptions: {
            props: {
              type: 'password',
              label: 'Default Password Field',
            },
          },
        },
        { name: 'button', component: FormlyFieldButton, wrappers: ['form-field'],
            defaultOptions: {
              props: {
                btnType: 'primary',
                type: 'button',
              },
            },
        },
        { name: 'date', component: dateField, wrappers:['form-field']},
      ],
      validationMessages: [
        { name: 'required', message: `Campo obligatorio` },
      ],
    }),
  ],
  exports:[
    PrincipalLayoutComponent,
    NoLayoutComponent,
    DialogComponent,

    AlertModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    FormlyMaterialModule,
    FormlyBootstrapModule,
    

    FormlyFieldButton,
    dateField,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
