import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { examresult } from '../data/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamserviceService {

  constructor(private http : HttpClient) { }
  public getexamresultlist(classid:number,subjectid:number):Observable<examresult[]>{
    return this.http.get<examresult[]>(environment.URL+`ExamResult/generateStudentsGrades/${classid}/${subjectid}`);
  }
  public updateexamresult(data:examresult[]){
    return this.http.put(environment.URL+`ExamResult/SaveResults`,data);
  }
  public upgradestudents(){
    return this.http.put(environment.URL+`ExamResult/upgradeStudent`,null);
  }
}
