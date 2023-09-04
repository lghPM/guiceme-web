import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NAV } from  '../../shared/config/global';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { API } from '../../shared/config/endpoints';


import { NgxSpinnerService } from 'ngx-spinner';
import { AccountService } from '../login/services/account.service';
import { AlertService } from 'src/app/shared/alert';
import { AppInjectorService } from 'src/app/shared/injector/app-injector.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { SessionStorageService } from '../login/services/session-storage.service';

@Component({
  selector: 'app-general',
  template: '',
})
export class GeneralComponent implements OnDestroy {
  @ViewChild('tableModalSalir') tableModalSalir: any;

  protected _sesionStorage: SessionStorageService;
  protected _accountService: AccountService;
  protected _ruta: ActivatedRoute;
  protected _alertServices: AlertService;
  protected _spinner: NgxSpinnerService;
  protected _router: Router;
  protected _dialog: MatDialog;
  _nav = NAV;

  subscripcion: Subscription;

  constructor() {
    const injector = AppInjectorService.getInjector();
    this._sesionStorage = injector.get(SessionStorageService);
    this._accountService = injector.get(AccountService);
    this._ruta = injector.get(ActivatedRoute);
    this._alertServices = injector.get(AlertService);
    this._spinner = injector.get(NgxSpinnerService);
    this._dialog = injector.get(MatDialog);
    this._router = injector.get(Router);

    history.pushState(null, '', location.href);
    this.subscripcion = fromEvent(window, 'popstate').subscribe((_) => {
      history.pushState(null, '', location.href);
    });

    this._ruta.queryParams.subscribe((params) => {
      if (params) {
        setTimeout(() => {
          this._router.navigate([], {
            relativeTo: this._ruta,
            queryParams: null,
            queryParamsHandling: '',
          });
        }, 1000);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscripcion?.unsubscribe();
  }

  validaCamposFormulario(formGroups: FormGroup[]) {
    formGroups.forEach((formulario) => {
      Object.keys(formulario.controls).forEach((field) => {
        const control = formulario.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validaCamposFormulario([control]);
        } else if (control instanceof FormArray) {
          control.controls.forEach((element) => {
            if (element instanceof FormControl) {
              element.markAsTouched({ onlySelf: true });
            } else if (element instanceof FormGroup) {
              this.validaCamposFormulario([element]);
            }
          });
        }
      });
    });
  }

  irAHome(){
    this._router.navigate([NAV.home]);
  }

  navegarA(route: string, parametro?: any) {
    this._router.navigate([route], {
      skipLocationChange: true,
      queryParams: parametro,
    });
  }

  openModalSalir() {
    this.tableModalSalir.nativeElement.className = 'modal show-modal';
  }

  closeModalSalir() {
    this.tableModalSalir.nativeElement.className = 'modal hide-modal';
  }

  goToHome(page?: any) {
    window.parent.location.href = NAV.home;
  }

  goToLogin() {
    this._accountService.logout();
    window.parent.location.href = API.login;
  }

  abrirModal(Component: any, data: any): Observable<any> {
    const dialogRef = this._dialog.open(Component, { width: '496px', data });
    return dialogRef.afterClosed();
  }

  /**
   *
   * @param mensaje Mensaje que muestra el dialogo
   * @param pregunta Pregunta para realizar la acción
   * @param labelOk Etiqueta del botón de acción
   * @param labelCerrar Etiqueta del botón de cancelar
   * @returns Observable con la respuesta del Dialogo
   */
  abrirDialog(
    mensaje: string,
    pregunta: string,
    labelOk?: string,
    labelCerrar?: string
  ): Observable<any> {
    let data = {
      mensaje: mensaje,
      pregunta: pregunta,
      labelOk: labelOk ? labelOk : 'Aceptar',
      labelCerrar: labelCerrar ? labelCerrar : 'Cancelar',
      noAceptar: false
    };

    return this.abrirModal(DialogComponent, data);
  }

  abrirDialogUnicoBoton(
    mensaje: string,
    pregunta: string,
    labelOk?: string,
    labelCerrar?: string): Observable<any> {
      let data = {
        mensaje: mensaje,
        pregunta: pregunta,
        labelOk: labelOk ? labelOk : 'Aceptar',
        labelCerrar: labelCerrar ? labelCerrar : 'Cancelar',
        noAceptar: true
      };
      return this.abrirModal(DialogComponent, data);
    }

  scrollTo(idElement:any){
    setTimeout(() => {
      var element = document.getElementById(idElement);
      if(element)
        element.scrollIntoView({block: "end", behavior: "smooth"});
    }, 500);
  }

}
