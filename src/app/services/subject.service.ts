import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { subject } from '../data/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http:HttpClient) { }
  public post(subject:subject){
    return this.http.post<subject>(environment.URL+"Subject/Create",subject)
  }
  public get(id:number){
    return this.http.get<subject>(environment.URL+"/api/Subject/GetById/"+id)
  }
  public getall(){
    return this.http.get<subject[]>(environment.URL+"Subject/GetAll")
  }
  public delete(id:number){
    return this.http.delete(environment.URL+"Subject?id="+id)
  }
}
