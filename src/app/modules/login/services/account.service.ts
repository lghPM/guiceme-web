import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(
    public sStorage: SessionStorageService
    ) { }

    logout() {
      this.sStorage.clear();
    }

    getUser(){
      return this.sStorage.getUser();
    }
}
