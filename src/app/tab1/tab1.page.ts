import { Component, inject, type OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonBadge,
  IonSpinner,
  IonText,
  IonButton,
} from '@ionic/angular';

import type { Empleado } from '../models/empleado.model';
import { EmpleadosService } from '../services/empleados.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonBadge,
    IonSpinner,
    IonText,
    IonButton,
  ],
})
export class Tab1Page implements OnInit {
  private empleadosService = inject(EmpleadosService);

  empleados: Empleado[] = [];
  empleadosFiltrados: Empleado[] = [];

  cargando = true;
  mensajeError = '';

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  // Consulta los empleados de la API
  cargarEmpleados(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.empleadosService.obtenerEmpleados().subscribe({
      next: (respuesta) => {
        this.empleados = respuesta.users;
        this.empleadosFiltrados = [...this.empleados];
        this.cargando = false;
      },
      error: () => {
        this.mensajeError = 'No se pudieron cargar los empleados. Verificá tu conexión.';
        this.cargando = false;
      },
    });
  }

  // Filtra por nombre, apellido, correo o departamento
  filtrarEmpleados(event: CustomEvent<{ value?: string | null }>): void {
    const texto = event.detail.value?.trim().toLowerCase() ?? '';

    this.empleadosFiltrados = this.empleados.filter((empleado) => {
      const nombre = `${empleado.firstName} ${empleado.lastName}`.toLowerCase();
      const correo = empleado.email.toLowerCase();
      const departamento = empleado.company.department.toLowerCase();

      return (
        nombre.includes(texto) ||
        correo.includes(texto) ||
        departamento.includes(texto)
      );
    });
  }
}
