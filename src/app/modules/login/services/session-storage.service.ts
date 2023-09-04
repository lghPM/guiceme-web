import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {

  constructor(private storageService: StorageService) { }

  setJsonValue(key: string, value: any) {
    this.storageService.saveData(key, value);
  }

  getJsonValue(key: string) {
    return this.storageService.getData(key);
  }

  clear() {
    return this.storageService.clearData();
  }

  saveToken(token: any) {
    this.storageService.removeData(TOKEN_KEY);
    this.storageService.saveData(TOKEN_KEY, token);
  }

  getToken(): any {
    return this.storageService.getData(TOKEN_KEY);
  }

  saveUser(user: any) {
    this.storageService.removeData(USER_KEY);
    this.storageService.saveData(USER_KEY, user);
  }

  getUser():any {
    return this.storageService.getData(USER_KEY);
  }
}
