import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor() {}

  public getItem(item: any) {
    const localStorageItem = localStorage?.getItem(item) || undefined;
    return localStorageItem ? JSON.parse(localStorageItem) : {};
  }

  public setItem(item: string, value: any) {
    return localStorage.setItem(item, JSON.stringify(value));
  }

  public removeItem(item: string) {
    return localStorage.removeItem(item);
  }

  public removeAll() {
    localStorage.clear();
  }

  public getUser(){
    return this.getItem('Usuario')!.toString().replace(/['"]+/g, '')
  }
}
