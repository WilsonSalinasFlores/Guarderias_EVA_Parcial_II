import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, Subscriber, throwError } from 'rxjs';
import { INinos } from '../Interfaces/ininos';

@Injectable({
  providedIn: 'root'
})
export class NinosService {
  
  private API_URL = environment.apiUrl;
  private CONTEXT = 'api/Ninos';

  constructor(private http: HttpClient) { }
    manejoErrores(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error de red';
    return throwError(() => {
      new Error(msg);
      console.error(msg);
    });
  }

  agregarNino(nino: INinos): Observable<INinos> {
    return this.http.post<INinos>(`${this.API_URL}${this.CONTEXT}`, nino)
      .pipe(
        catchError(this.manejoErrores)
      );
  }
  obtenerTodosLosNinos(): Observable<INinos[]> {
    return this.http.get<INinos[]>(`${this.API_URL}${this.CONTEXT}`)
      .pipe(
        catchError(this.manejoErrores)
      );
  }
  obtenerUnNino(ninoId: number): Observable<INinos> {
    return this.http.get<INinos>(`${this.API_URL}${this.CONTEXT}/${ninoId}`)
      .pipe(
        catchError(this.manejoErrores)
      );
  }

  actualizarNino(nino: INinos): Observable<INinos> {
    return this.http.put<INinos>(`${this.API_URL}${this.CONTEXT}/${nino.ninoId}`, nino)
      .pipe(
        catchError(this.manejoErrores)
      );
  }
  eliminarNino(ninoId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}${this.CONTEXT}/${ninoId}`)
      .pipe(
        catchError(this.manejoErrores)
      );
  }

  cargarNinosNoAsignados(): Observable<INinos[]> {
    return this.http.get<INinos[]>(`${this.API_URL}${this.CONTEXT}/NoAsignados`)
      .pipe(
        catchError(this.manejoErrores)
      );
  }
}
