import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from './alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    // enable subscribing to alerts observable
    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    successSave(options?: any) {
      this.alert(new Alert({ ...options, type: AlertType.Success, message: 'La información se guardó correctamente' }));
    }

    error(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    errorNoEmpresaSeleccionada() {
      this.alert(new Alert({ type: AlertType.Error, message: 'No se ha seleccionado una empresa' }));
    }

    errorSave(options?: any) {
      this.alert(new Alert({ ...options, type: AlertType.Error, message: '<b>Error</b> La información no se guardó correctamente' }));
    }

    errorCamposObligatorios(options?: any) {
      this.alert(new Alert({ ...options, type: AlertType.Error, message: '<b>Error</b> No se ha registrado la información completa' }));
    }

    errorServer(options?: any) {
      this.alert(new Alert({ ...options, type: AlertType.Error, message: '<b>Error</b> El servidor no responde, intente más tarde' }));
    }

    errorNoautorizado(options?: any) {
      this.alert(new Alert({ ...options, type: AlertType.Error, message: '<b>Error</b> No tiene permisos para acceder a este recurso' }));
    }

    info(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    warn(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

    // main alert method
    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
}
