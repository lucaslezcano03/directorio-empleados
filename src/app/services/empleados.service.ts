import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import type { RespuestaEmpleados } from '../models/empleado.model';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  // Inyección del servicio HTTP mediante constructor.
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(@Inject(HttpClient) private readonly http: HttpClient) {}

  // Obtiene la lista completa de empleados.
  obtenerEmpleados(): Observable<RespuestaEmpleados> {
    return this.http.get<RespuestaEmpleados>(`${environment.apiUrl}?limit=0`);
  }
}
