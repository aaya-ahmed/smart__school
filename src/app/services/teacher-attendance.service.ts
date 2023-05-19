import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IteacherAttendance } from 'Interfaces/iteacher-attendance';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TeacherAttendanceService {

  constructor(private _HttpClient: HttpClient) {}

  generateAttendnce(): Observable<IteacherAttendance[]> {
    return this._HttpClient.get<IteacherAttendance[]>(
      `${environment.swaggerUrl}/api/TeacherAttendance/generateAttendance`
    );
  }

  saveAttendnce(attList:IteacherAttendance[]): Observable<IteacherAttendance[]> {
    return this._HttpClient.put<IteacherAttendance[]>(
      `${environment.swaggerUrl}/api/TeacherAttendance/addTeacherAttendance`,
      attList
    );
  }
}
