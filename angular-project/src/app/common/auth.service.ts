import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * Purpose: get access Token
   * @returns 
   */
  getAuthToken():any {
    return localStorage.getItem('Token');
  }
}
