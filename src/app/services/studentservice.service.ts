import { Injectable } from '@angular/core';
import { student } from '../data/student';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {
  constructor(private http:HttpClient) { }
  public update(student:student){
    return this.http.put<student>(environment.URL+"Student/Edit",student)
  }
  public get(id:number):Observable<student>{
    return this.http.get<student>(environment.URL+"Student/GetById/"+id).pipe(
      map((res:any)=>{
        return {
          Id:res.id,
          StudentFirstName:res.studentFirstName,
          Gender:res.gender,
          StudentPhone:res.studentPhone,
          StudentBirthDate:res.studentBirthDate,
          Address:res.address,
          StudentPhotoUrl:res.studentPhotoUrl,
          StudentPhoto:res.studentPhoto,
          MaxDayOff:res.maxDayOff,
          AbsenceDays:res.absenceDays,
          Fees:res.fees,
          ParentID:res.parentID,
          ClassRoomID:res.classRoomID,
          ClassRoomName:res.classRoomName
        }
      })
    )
  }
  public getall():Observable<student[]>{
    return this.http.get<student[]>(environment.URL+"Student/GetAll").pipe(
      map((res:any[])=>{
        return res.map(responce=>({
          Id:responce.id,
          StudentFirstName:responce.studentFirstName,
          Gender:responce.gender,
          StudentPhone:responce.studentPhone,
          StudentBirthDate:responce.studentBirthDate,
          Address:responce.address,
          StudentPhotoUrl:responce.studentPhotoUrl,
          StudentPhoto:responce.studentPhoto,
          MaxDayOff:responce.maxDayOff,
          AbsenceDays:responce.absenceDays,
          Fees:responce.fees,
          ParentID:responce.parentID,
          ClassRoomID:responce.classRoomID,
          ClassRoomName:responce.classRoomName
        }))
      })
    )
      
  }
  public getallByGradeYear(id:number):Observable<student[]>{
    return this.http.get<student[]>(environment.URL+"Student/GetByGradeYear/"+id).pipe(
      map((res:any[])=>{
        return res.map(responce=>({
          Id:responce.id,
          StudentFirstName:responce.studentFirstName,
          Gender:responce.gender,
          StudentPhone:responce.studentPhone,
          StudentBirthDate:responce.studentBirthDate,
          Address:responce.address,
          StudentPhotoUrl:responce.studentPhotoUrl,
          StudentPhoto:responce.studentPhoto,
          MaxDayOff:responce.maxDayOff,
          AbsenceDays:responce.absenceDays,
          Fees:responce.fees,
          ParentID:responce.parentID,
          ClassRoomID:responce.classRoomID,
          ClassRoomName:responce.classRoomName
        }))
      })
    )
      
  }
  public getstudentbyclassid(id:number):Observable<student[]>{
    return this.http.get<student[]>(environment.URL+`Student/GetByClass/`+id).pipe(map(
      ((res:any[])=>{
        return res.map(responce=>({
          Id:responce.id,
          StudentFirstName:responce.studentFirstName,
          Gender:responce.gender,
          StudentPhone:responce.studentPhone,
          StudentBirthDate:responce.studentBirthDate,
          Address:responce.address,
          StudentPhotoUrl:responce.studentPhotoUrl,
          StudentPhoto:responce.studentPhoto,
          MaxDayOff:responce.maxDayOff,
          AbsenceDays:responce.absenceDays,
          Fees:responce.fees,
          ParentID:responce.parentID,
          ClassRoomID:responce.classRoomID,
          ClassRoomName:responce.classRoomName
        }))
      })
    ))
  }
  public delete(id:string){
    return this.http.delete(environment.URL+"Student/Delete?id="+id)
  }
}
