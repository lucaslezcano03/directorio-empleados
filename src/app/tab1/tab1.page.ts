
import {
  ChangeDetectorRef,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
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
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

import type { Empleado } from '../models/empleado.model';
import { EmpleadosService } from '../services/empleados.service';
import { FavoritosService } from '../services/favoritos.service';

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
    IonIcon,
  ],
})
export class Tab1Page implements OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly empleadosService = inject(EmpleadosService);
  readonly favoritosService = inject(FavoritosService);

  empleados: Empleado[] = [];
  empleadosFiltrados: Empleado[] = [];

  cargando = true;
  mensajeError = '';

  constructor() {
    addIcons({ heart, heartOutline });
  }

  ngOnInit(): void {
    void this.inicializar();
  }

  private async inicializar(): Promise<void> {
    try {
      await this.favoritosService.cargarFavoritos();
    } catch {
      this.favoritosService.idsFavoritos = [];
    }

    this.cargarEmpleados();
  }

  // Consulta los empleados de la API.
  cargarEmpleados(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.empleadosService.obtenerEmpleados().subscribe({
      next: (respuesta) => {
        this.empleados = respuesta.users;
        this.empleadosFiltrados = [...this.empleados];
        this.cargando = false;

        this.cdr.markForCheck();
      },
      error: () => {
        this.mensajeError =
          'No se pudieron cargar los empleados. Verificá tu conexión.';
        this.cargando = false;

        this.cdr.markForCheck();
      },
    });
  }

  // Filtra por nombre, apellido, correo o departamento.
  filtrarEmpleados(event: CustomEvent<{ value?: string | null }>): void {
    const texto = event.detail.value?.trim().toLowerCase() ?? '';

    this.empleadosFiltrados = this.empleados.filter((empleado) => {
      const nombre =
        `${empleado.firstName} ${empleado.lastName}`.toLowerCase();
      const correo = empleado.email.toLowerCase();
      const departamento = empleado.company.department.toLowerCase();

      return (
        nombre.includes(texto) ||
        correo.includes(texto) ||
        departamento.includes(texto)
      );
    });
  }

  // Agrega o quita un empleado de favoritos.
  async alternarFavorito(id: number): Promise<void> {
    await this.favoritosService.alternarFavorito(id);
    this.cdr.markForCheck();
  }
}
