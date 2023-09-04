import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-date',
  template: `
      <input
        type="date"
        [formControl]="formControl"
        class="form-control"
        [formlyAttributes]="field"
        [class.is-invalid]="showError"
        [max]="to.max"
        [min]="to.min"
        placeholder="dd/mm/aaaa"
      />

     `,


})
export class dateField extends FieldType<FieldTypeConfig>  {

}

