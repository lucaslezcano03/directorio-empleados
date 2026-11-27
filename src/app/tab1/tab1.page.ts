
import {
  ChangeDetectorRef,
  Component,
  Inject,
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
  IonSegment,
  IonSegmentButton,
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
    IonSegment,
    IonSegmentButton,
  ],
})
export class Tab1Page implements OnInit {
  empleados: Empleado[] = [];
  empleadosFiltrados: Empleado[] = [];

  cargando = true;
  mensajeError = '';

  private textoBusqueda = '';

  orden: 'asc' | 'desc' = 'asc';

  get cantidadDepartamentos(): number {
    return new Set(
      this.empleados.map(
        (empleado) => empleado.company.department,
      ),
    ).size;
  }

  get cantidadFavoritos(): number {
    return this.favoritosService.idsFavoritos.length;
  }

  /* eslint-disable @angular-eslint/prefer-inject */
  constructor(
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    @Inject(EmpleadosService) private readonly empleadosService: EmpleadosService,
    @Inject(FavoritosService) readonly favoritosService: FavoritosService,
  ) {
    addIcons({ heart, heartOutline });
  }
  /* eslint-enable @angular-eslint/prefer-inject */

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
        this.actualizarEmpleadosFiltrados();

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
  filtrarEmpleados(
    event: CustomEvent<{ value?: string | null }>,
  ): void {
    this.textoBusqueda =
      event.detail.value?.trim().toLowerCase() ?? '';

    this.actualizarEmpleadosFiltrados();
  }

  // Cambia el orden alfabético de los empleados.
  cambiarOrden(valor: unknown): void {
    this.orden = valor === 'desc' ? 'desc' : 'asc';

    this.actualizarEmpleadosFiltrados();
  }

  // Actualiza la lista aplicando búsqueda y ordenamiento.
  private actualizarEmpleadosFiltrados(): void {
    this.empleadosFiltrados = this.empleados
      .filter((empleado) => {
        const nombre =
          `${empleado.firstName} ${empleado.lastName}`.toLowerCase();

        const correo = empleado.email.toLowerCase();
        const departamento =
          empleado.company.department.toLowerCase();

        return (
          nombre.includes(this.textoBusqueda) ||
          correo.includes(this.textoBusqueda) ||
          departamento.includes(this.textoBusqueda)
        );
      })
      .sort((a, b) => {
        const nombreA = `${a.firstName} ${a.lastName}`;
        const nombreB = `${b.firstName} ${b.lastName}`;

        const resultado = nombreA.localeCompare(
          nombreB,
          'es',
          { sensitivity: 'base' },
        );

        return this.orden === 'asc' ? resultado : -resultado;
      });

    this.cdr.markForCheck();
  }

  // Agrega o quita un empleado de favoritos.
  async alternarFavorito(id: number): Promise<void> {
    await this.favoritosService.alternarFavorito(id);

    this.cdr.markForCheck();
  }
}
