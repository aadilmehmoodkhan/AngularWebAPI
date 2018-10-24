import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor() { }

  save(key: string, value: string)
  {
    localStorage.setItem(key, value);
  }

  remote(key: string) {
    localStorage.removeItem(key);
  }

  read(key): string {
    return localStorage.getItem(key);
  }

  clear() {
    localStorage.clear();
  }

}
