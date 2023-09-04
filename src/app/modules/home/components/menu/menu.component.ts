import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralComponent } from 'src/app/modules/general/general.component';

import { MenuItem } from '../model/menuitem.model';
import { MenuService } from 'src/app/modules/login/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends GeneralComponent implements OnInit {

  constructor(private menuService: MenuService,
    public router: Router) {
    super();
  }

    menu: any[] ;
    menu2: MenuItem[];

    finalMenu: any[] = [];
    menuLoaded: Boolean;
    lstCodigoPostal : any;

  async ngOnInit(){
    // await this.menuService.getMenuByUser(this._accountService.getUser().idUser).then( data => {
    //   this.menu = data;
    // });

    console.log("MENU :: ",this.menu);
    this.renderMenu(this.menu);
    console.log(this.finalMenu);
  }

  async _ngOnInit() {
    this.menu =
    [
      {
        id: "1",
        text: "Administración Terceros Autorizados",
        //action: undefined,
        icon: "image-home",
        menuFatherId: undefined,
        children: [
          {
            id: "1",
            text: "Alta de Tercero Autorizado",
            //action: undefined,
            icon: "",
            modulo: "tercero-autorizado",
            desAccion: "alta"
          },{
            id: "2",
            text: "Modificación de RP s a Tercero Autorizado",
            //action: undefined,
            icon: "",
            modulo: "tercero-autorizado",
            accion: "modificacion"
          },{
            id: "3",
            text: "Baja de Terceros Autorizados ",
            //action: undefined,
            icon: "",
            modulo: "tercero-autorizado",
            accion: "baja"
          },
        ],
        isCollapsed:undefined
      },{
        id: "2",
        text: "Consulta",
        //action: undefined,
        icon: "image-search",
        menuFatherId: undefined,
        children: [
          {
            id: "1",
            text: "Consulta Estado de cuenta",
            //action: undefined,
            icon: ""
          },{
            id: "2",
            text: "Consulta de Línea de Captura",
            //action: undefined,
            icon: ""
          },{
            id: "3",
            text: "Consulta a Detalle de RP s ",
            //action: undefined,
            icon: ""
          },{
            id: "3",
            text: "Consulta a Detalle de NSS",
            //action: undefined,
            icon: ""
          },
        ],
        isCollapsed:undefined
      },{
        id: "3",
        text: "Catálogos",
        //action: undefined,
        icon: "image-catalogos",
        menuFatherId: undefined,
        children: [
          {
            id: "1",
            text: "Catálogos salarios mínimos (Opción referencia y opción descarga)",
            //action: undefined,
            icon: "",
            modulo: "",
            accion: "",
            children: [
              {
                id: "1",
                text: "Catálogos salarios mínimos (Opción referencia y opción descarga)",
                //action: undefined,
                icon: "",
                modulo: "",
                accion: ""
              }]
          },{
            id: "2",
            text: "Catálogo INPC (Opción referencia y opción descarga)",
            //action: undefined,
            icon: "",
            children: []
          },{
            id: "3",
            text: "Catálogo recargos (Opción referencia y opción descarga)",
            //action: undefined,
            icon: "",
            children: []
          },{
            id: "4",
            text: "Catálogo UMA (Opción referencia y opción descarga)",
            //action: undefined,
            icon: "",
            modulo: "",
            accion: "",
            children: []
          },{
            id: "5",
            text: "Catálogo de valor INFONAVIT (Opción referencia y opción descarga)",
            //action: undefined,
            icon: "",
            children: []
          }
        ],
        isCollapsed:undefined
      },
    ];
    //*/


  }

  renderMenu(menu: MenuItem[]) {
    while (menu.length > 0) {
      menu.forEach((menuItem) => {
        //menuItem.children = [];

        if (!menuItem.menuFatherId) {
          const index: number = menu.indexOf(menuItem);
          if (index !== -1) {
            menu.splice(index, 1);
          }
          //menuItem.opacity = 0;
          this.finalMenu.push(menuItem);
        } else {
          const father = menuItem.menuFatherId;

          this.serachFather(this.finalMenu, father, menuItem, menu);
        }
      });
    }
    this.menuLoaded = true;
  }

  serachFather(menuArray: MenuItem[], father, menuItem: MenuItem, menu) {
    menuArray.forEach((menuPainted) => {
      if (menuPainted.id === father) {
        //menuItem.opacity = menuPainted.opacity + 1;
        // menuPainted.children.push(menuItem);

        const index: number = menu.indexOf(menuItem);
        if (index !== -1) {
          menu.splice(index, 1);
        }
      } else {
        // this.serachFather(menuPainted.children, father, menuItem, menu);
      }
    });
  }

  onCargarRepTmp(x) {
    if (
      this.lstCodigoPostal != undefined &&
      this.lstCodigoPostal.length == 0
    ) {
      this.lstCodigoPostal = new Array();
    }
    this.lstCodigoPostal.push(x);
  }

  salirSesion(){
    this._accountService.logout();
    this.router.navigate([this._nav.login]);
  }

}
