import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  init() {
       return this.loadConfig();
  }
/// Load the configuration file and set the environment variable
  public loadConfig() {
      return this.http.get('/assets/config.json')
      .toPromise()
      .then((data: any) => {
          environment.apiBase = data.apiUrl;
      });
  }
}
