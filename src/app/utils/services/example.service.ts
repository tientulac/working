import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';

@Injectable({
  providedIn: 'root'
})
export class HinhThucKiemDinhService {

  constructor(@Inject(AppConfig) private readonly appConfig: AppConfiguration, private http: HttpClient) { }


  getAll(token): Observable<any> {
    return this.http
      .get<any>(this.appConfig.QA_API + 'api/QaHinhThucKiemDinh', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getList(req: any,token): Observable<any> {
    
    return this.http
      .post<any>(this.appConfig.QA_API + 'api/QaHinhThucKiemDinh/Load_List',req, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
  
  delete(ID_hinh_thuc_kiem_dinh: number,token): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.QA_API + 'api/QaHinhThucKiemDinh/'+ID_hinh_thuc_kiem_dinh, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  update(ID_hinh_thuc_kiem_dinh: number, qaHinhThucKiemDinh: any,token): Observable<any> {
    return this.http
      .put<any>(this.appConfig.QA_API + 'api/QaHinhThucKiemDinh/'+ID_hinh_thuc_kiem_dinh,qaHinhThucKiemDinh, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  insert(qaHinhThucKiemDinh: any, token): Observable<any> {
    return this.http
      .post<any>(this.appConfig.QA_API + 'api/QaHinhThucKiemDinh',qaHinhThucKiemDinh, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z) => {
          return z;
        })
    );
  }
}