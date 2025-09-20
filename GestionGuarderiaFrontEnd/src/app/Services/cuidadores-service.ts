import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subscriber, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ICuidadores } from '../Interfaces/icuidadores';

@Injectable({
  providedIn: 'root'
})
export class CuidadoresService {
  private API_URL = environment.apiUrl;
  private CONTEXT = 'api/Cuidadores';

  constructor(private http: HttpClient) { }
    manejoErrores(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error de red';
    return throwError(() => {
      new Error(msg);
      console.error(msg);
    });
  }
  
  cargarTodosLosCuidadores(): Observable<ICuidadores[]> {
    return this.http.get<ICuidadores[]>(`${this.API_URL}${this.CONTEXT}`)
      .pipe(
        catchError(this.manejoErrores)
      );
  }
  editarCuidador(cuidador: ICuidadores): Observable<ICuidadores> {
    return this.http.put<ICuidadores>(`${this.API_URL}${this.CONTEXT}/${cuidador.cuidadorId}`, cuidador)
      .pipe(
        catchError(this.manejoErrores)
      );
  }

  agregarCuidador(cuidador: ICuidadores): Observable<ICuidadores> {
    return this.http.post<ICuidadores>(`${this.API_URL}${this.CONTEXT}`, cuidador)
      .pipe(
        catchError(this.manejoErrores)
      );
  }
  
  eliminarCuidador(cuidadorId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}${this.CONTEXT}/${cuidadorId}`)
      .pipe(
        catchError(this.manejoErrores)
      );
  }

}
