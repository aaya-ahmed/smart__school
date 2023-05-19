import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IAttendence } from '../data/iattendence.js';
import { IteacherAttendance } from '../data/iteacher-attendance.js';

// Observable

@Injectable({
  providedIn: 'root',
})
export class AttendeceService {
  constructor(private _HttpClient: HttpClient) {}

  generateStudentAttendnce(): Observable<IAttendence[]> {
    return this._HttpClient.get<IAttendence[]>(
      `${environment.URL}StudentAttendance/generateAttendance`
    );
  }

  saveStudentAttendnce(attList:IAttendence[]): Observable<IAttendence[]> {
    return this._HttpClient.put<IAttendence[]>(
      `${environment.URL}StudentAttendance/addStudentAttendance`,
      attList
    );
  }
  generateTeacherAttendnce(): Observable<IteacherAttendance[]> {
    return this._HttpClient.get<IteacherAttendance[]>(
      `${environment.URL}TeacherAttendance/generateAttendance`
    );
  }

  saveTeacherAttendnce(attList:IteacherAttendance[]): Observable<IteacherAttendance[]> {
    return this._HttpClient.put<IteacherAttendance[]>(
      `${environment.URL}TeacherAttendance/addTeacherAttendance`,
      attList
    );
  }
}
