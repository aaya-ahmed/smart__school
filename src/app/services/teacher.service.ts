import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { teacher } from '../data/teacher';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http:HttpClient) { }
  public post(teacher:teacher){
    return this.http.post<teacher>(environment.URL+"Teacher/Save",teacher)
  }
  public update(teacher:teacher){
    return this.http.patch<teacher>(environment.URL+"Teacher/Edit",teacher)
  }
  public get(id:number){
    return this.http.get<teacher>(environment.URL+"Teacher/GetById/"+id)
  }
  public getall():Observable<teacher[]>{
    return this.http.get<teacher[]>(environment.URL+"Teacher/GetAll").pipe(
      map((res:any[])=>{
        return res.map(responce=>({
          FullName:responce.fullName ,
          Id: responce.id,
          Email: responce.email,
          Password: responce.password,
          Gender: responce.gender,
          Salary: responce.salary,
          Phone: responce.phone,
          Address: responce.address,
          PhotoUrl: responce.photoUrl,
          Photo: responce.photo,
          HireDate: responce.hireDate,
          MaxDayOff: responce.maxDayOff,
          AbsenceDays: responce.absenceDays,
          SubjectId: responce.subjectId,
          SubjectName: responce.subjectName,
          IdentityUserId: responce.identityUserId
        }
          ))
        }
      )
    )
  }
  public delete(id:string){
    return this.http.delete(environment.URL+"Teacher/Delete?id="+id)
  }
}
