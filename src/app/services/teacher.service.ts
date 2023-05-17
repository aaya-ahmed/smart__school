import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { teacher } from '../data/teacher';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http:HttpClient) { }
  public post(teacher:teacher){
    return this.http.post<teacher>(environment.URL+"Teacher/Save",teacher)
  }
  public get(id:number){
    return this.http.get<teacher>(environment.URL+"Teacher/GetById/"+id)
  }
  public getall(){
    return this.http.get<teacher[]>(environment.URL+"Teacher/GetAll")
  }
  public delete(id:string){
    return this.http.delete(environment.URL+"Teacher/Delete?id="+id)
  }
}
