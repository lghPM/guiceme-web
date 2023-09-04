import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/shared/config/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  public getMenuByUser(idUser:number){
    let options: HttpParams = new HttpParams();
    options = options.set('idUsuario',idUser);
     return this.http.get<any>(`${API.registro.menuByUser}`, { params: options }).toPromise().then( data => {
      return data
    });
  }

}
