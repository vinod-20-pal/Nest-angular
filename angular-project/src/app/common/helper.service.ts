import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, throwError } from 'rxjs';
import { Environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  headerFlag = new BehaviorSubject(false);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient,private env: Environment,
    private toastr: ToastrService) { }

  /**
   * Purpose: Post API
   * @param url 
   * @param data 
   * @returns 
   */
  post(url:string, data:any){
    return this.http.post(url,
      data,
      this.httpOptions);
  }

  /**
   * Purpose: Update API
   * @param id 
   * @param data 
   * @returns 
   */
  patch(url:string,data:any){
    return this.http.patch(url,
    JSON.stringify(data),
    this.httpOptions);
  }

  /**
   * Purpose: Get API
   * @param url 
   * @returns 
   */
  get(url:string){
    return this.http.get(this.env.BASE_URL + url,
      this.httpOptions);
  }

  /**
   * Purpose: Delete API
   * @param id 
   * @returns 
   */
  delete(url:string){
    return this.http.delete(url);
  }
  /**
   * Purpose: Handle http error
   * @param error 
   * @returns 
   */
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
