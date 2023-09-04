import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from 'src/app/shared/config/endpoints';
import { lastValueFrom, of } from 'rxjs';
import { MockData } from './mockdata';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async login(user: HttpParams) {
    return  await lastValueFrom(of(MockData.login));

    // return await lastValueFrom(this.http.post<any>(`${API.seguridad.oauth}`,
    //   user.toString(),
    //   {
    //     headers: new HttpHeaders()
    //       .set('Content-Type', 'application/x-www-form-urlencoded')
    //       .set('Authorization', 'Basic ' + btoa('sappApp' + ':' + '$hem!pA-Ho3r70o'))
    //   }
    // ));
  }
}
