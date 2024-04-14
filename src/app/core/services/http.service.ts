import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  baseUrl:string="http://localhost:3000/";

  headers:HttpHeaders = new HttpHeaders({
    'content-type':'application/json'
  })
  getDataFromServer(endPoint:String,params:HttpParams= new HttpParams()){
    const url = this.baseUrl + endPoint;
    return this.http.get(url,{headers:this.headers,params:params})
  }
 
  postDataToServer(endPoint:String,data:any){
    const url = this.baseUrl + endPoint;
    return this.http.post(url,data,{headers:this.headers});
  }
}
