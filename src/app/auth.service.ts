import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "true",
    'Referrer-Policy': "origin"
    
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private http: HttpClient
  ) { }
  
  adminLoginUrl='http://localhost:3000/auth-admin'
  userLoginUrl='http://localhost:3000/user'
  getAdminCityUrl='http://localhost:3000/auth-admin/get'
  addAdminCityUrl='http://localhost:3000/auth-admin/addcity'
  updateAdminCityUrl='http://localhost:3000/auth-admin/update'
  public adminLogIn(userData: User): Observable<any> {
    return this.http.post(this.adminLoginUrl,userData,httpOptions);
  }
  public userLogIn(userData: User){
    return this.http.post(this.userLoginUrl,userData,httpOptions);
  }
  public isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }
  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
  }

  public getAdminCity(){
    return this.http.get(this.getAdminCityUrl,{
      headers:{Authorization:'Bearer ${this.getToken()}'}
    });
  }

  public updateAdminCity(id:string,data:any){
    return this.http.put(this.updateAdminCityUrl+"?cityID="+id,data,{
      headers:{Authorization:'Bearer ${this.getToken()}'}
    });
  }

  public getToken(){
    return localStorage.getItem("token");
  }

  public getLocation(cityName:string){
    return this.http.get("http://api.positionstack.com/v1/forward?access_key=24240544394e992ccefb68fb479ad9dc&query="+cityName);
  }
}


