import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-button',
  template: `
    <div>
      <ng-container *ngIf="!props.disabled && !form.disabled">
      <button [disabled]="props.disabled" [type]="props.type" [ngClass]="'btn btn-' + props['btnType'] + ' ' + props['classBtn']" [id]="props['idBtn']"  (click)="onClick($event)">
        {{ props['text'] }}
      </button>
      </ng-container>
      <ng-container *ngIf="props.disabled || form.disabled">
      <button [disabled]="props.disabled  || form.disabled" [type]="props.type" [ngClass]="'btn btn-' + props['btnType'] + ' ' +props['classBtn']"  [id]="props['idBtn']" >
        {{ props['text'] }}
      </button>
      </ng-container>
    </div>
  `,
   styles: [
    `
    .btn {
      width:100%;
      height:39px!important;
      padding: 5px;
      margin-top:16px;
    }
    `
  ]
})
export class FormlyFieldButton  extends  FieldType{

  onClick($event: Event) {
    if (this.props['onClick']) {
      this.props['onClick']($event);
    }
  }
}
