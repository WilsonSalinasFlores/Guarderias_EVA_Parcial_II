import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IAsignaciones } from '../Interfaces/iasignaciones';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {

  private API_URL = environment.apiUrl;
  private CONTEXT = 'api/Asignaciones';

  constructor(private http: HttpClient) { }
    manejoErrores(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error de red';
    return throwError(() => {
      new Error(msg);
      console.error(msg);
    });
  }
  agregarAsignacion(asignacion: IAsignaciones) {
    return this.http.post<IAsignaciones>(`${this.API_URL}${this.CONTEXT}`, asignacion)
      .pipe(
        catchError(this.manejoErrores)
      );
  }
  eliminarAsignacion(asignacionId: number) {
    return this.http.delete<void>(`${this.API_URL}${this.CONTEXT}/${asignacionId}`)
      .pipe(
        catchError(this.manejoErrores)
      );
  }
  obtenerTodasLasAsignaciones(): Observable<IAsignaciones[]> {
    return this.http.get<IAsignaciones[]>(`${this.API_URL}${this.CONTEXT}`)
      .pipe(
        catchError(this.manejoErrores)
      );
  }

  obtenerAsignacionesPorCuidador(cuidadorId: number): Observable<IAsignaciones[]> {
    console.log('Obteniendo asignaciones para el cuidadorId:', cuidadorId);
    console.log(`URL: ${this.API_URL}${this.CONTEXT}/PorCuidador/${cuidadorId}`);
    return this.http.get<IAsignaciones[]>(`${this.API_URL}${this.CONTEXT}/PorCuidador/${cuidadorId}`)
      .pipe(
        catchError(this.manejoErrores)
      );
  }

}
