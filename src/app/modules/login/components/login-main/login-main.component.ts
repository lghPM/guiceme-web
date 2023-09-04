import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { GeneralComponent } from 'src/app/modules/general/general.component';
import { AuthService } from '../../services/auth.service';
import { HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.scss']
})
export class LoginMainComponent extends GeneralComponent implements OnInit, OnDestroy {

  eFirmaToken: any;
  disableBtn: boolean = true;
  disableNoTc: boolean = true;

  constructor(public router: Router,
    public authService: AuthService,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this._accountService.logout();
  }

  //Login
  model:any={};
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className:"col-md-12",
          key: 'userName',
          type: 'input',
          props: {
            required:true,
            label: 'Usuario',
            placeholder:"Usuario",
            },
        },
        {
          className:"col-md-12",
          key: 'password',
          type: 'input',
          props: {
            type: 'password',
            label: 'Password',
            placeholder: 'Password',
            required: true,
           
          },
        },
        {
          className: 'col-md-6',
          //key:'rfc',
          type: 'button',
          props: {
            attributes: {
              style: 'width:100%;',
            },
            text: 'Iniciar',
            onClick: () => {
             this.doLogin();
            },
          },
        },
        
      ]
    }
  ]

  doLogin(){
    const body = new HttpParams()
      .set('username', this.model.userName)
      .set('password', this.model.password)
      .set('grant_type', 'password');

    this.authService.login(body)
    .then(data => {
      console.log(data)
      this._sesionStorage.saveToken(data.access_token);
      let perf = data.usuarioList;
      let perfil = perf[0];
      data.idPerfil = perfil.cvePerfil;
      data.nomPerfil = perfil.desPerfil;
      this._sesionStorage.saveUser(data);
      this.navegar(data);
    }).catch((err) => {
      this._alertServices.error(err.error.error_description);
    });

  }

  navegar(dataUser) {
    console.log(dataUser)
    if(dataUser){
      this.router.navigate([this._nav.home]);
    }
  }

  bloqueoIngreso(){
    if(this.disableBtn){
      return true;
    }else if(this.disableNoTc){
      return true;
    }
  }

  doCancel(){
    window.location.reload();
  }
}
