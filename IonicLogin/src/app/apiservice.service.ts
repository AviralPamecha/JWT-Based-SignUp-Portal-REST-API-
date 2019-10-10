import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';




@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {


  constructor(private _http: HttpClient,
    ) { }
  showlist(username,password) : Observable<any>{
    
    var obj = {"firstName": username, "password": password}
    console.log(obj);
   return this._http.post('http://localhost:3000/users',obj,{})
   
  }

  list() : Observable<any>{

     
     return this._http.get('http://localhost:3000/users');
  }
 login(username,password) : Observable<any> {
  var obj = {"username": username, "password": password}
  
  
   return this._http.post('http://localhost:3000/login', obj,{})
   
   
 }

afterLogin(token){
 var obj = {"token":token};
 
 
 return this._http.post('http://localhost:3000/afterLogin', obj,{});
}
}


