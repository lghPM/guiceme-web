import { Component, OnInit, ViewChild } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import { GeneralComponent } from 'src/app/modules/general/general.component';

@Component({
  selector: 'app-principal-layout',
  templateUrl: './principal-layout.component.html',
  styleUrls: ['./principal-layout.component.scss'],
})
export class PrincipalLayoutComponent extends GeneralComponent implements OnInit {
  @ViewChild('tableModalSesion') tableModal: any;

  constructor(
    private userIdle: UserIdleService,
  ) {
    super();

  }

  usuario: any;
  urlBase: string ;
  name: string ;
  role: string ;
  ngOnInit() {
    //Start watching for user inactivity.
    this.userIdle.startWatching();
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(() => this.openModal());
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => this.salirSesion());
    this.usuario = this._accountService.getUser();
    let nmc = '';
    this.urlBase = '/guiceme-web';
    this.name = nmc.concat(this.usuario.nombre, ' ', this.usuario.apellidoPaterno, ' ', this.usuario.apellidoMaterno == 'null' ? '' : this.usuario.apellidoMaterno);
  }

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }

  salirSesion() {
    this.goToLogin()
    this.stop();
    this.stopWatching();
  }

  closeStopModal() {
    this.tableModal.nativeElement.className = 'modal hide-modal';
    this.stop();
    this.stopWatching();
    this.restart();
    this.startWatching();
  }

  openModal() {
    this.tableModal.nativeElement.className = 'modal show-modal';
  }

  closeModal() {
    this.tableModal.nativeElement.className = 'modal hide-modal';
  }

}

