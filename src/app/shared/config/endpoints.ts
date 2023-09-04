import { environment } from 'src/environments/environment';

export const API = {

  seguridad: {
    oauth: environment.apiSeguridad + '/v1/oauth/token',
    
  },
  home: environment.base + '/home',
  login: environment.base + '/login',
  registro:{
    menuByUser: environment.apiSeguridad + '/v1/oauth/token'
  },
  catalogos:{
  },
  consultas:{
    detalleNss: environment.apiConsultas + '/v1/api/getDetalleNss',
  },
  reportes:{
    
  }
}
