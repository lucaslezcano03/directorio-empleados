
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
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButton,
  IonSpinner,
  IonText,
  IonBadge,
  IonSearchbar,
} from '@ionic/angular';

import type { Empleado } from '../models/empleado.model';
import { EmpleadosService } from '../services/empleados.service';

interface Departamento {
  nombre: string;
  empleados: Empleado[];
  expandido: boolean;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonButton,
    IonSpinner,
    IonText,
    IonBadge,
    IonSearchbar,
  ],
})
export class Tab2Page implements OnInit {
  departamentos: Departamento[] = [];
  cargando = true;
  mensajeError = '';
  totalEmpleados = 0;
  textoBusqueda = '';

  /* eslint-disable @angular-eslint/prefer-inject */
  constructor(
    @Inject(ChangeDetectorRef) private readonly cdr: ChangeDetectorRef,
    @Inject(EmpleadosService)
    private readonly empleadosService: EmpleadosService,
  ) {}
  /* eslint-enable @angular-eslint/prefer-inject */

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  // Obtiene los empleados y los organiza por departamento.
  cargarDepartamentos(): void {
    this.cargando = true;
    this.mensajeError = '';

    this.empleadosService.obtenerEmpleados().subscribe({
      next: (respuesta) => {
        this.totalEmpleados = respuesta.users.length;

        const grupos = new Map<string, Empleado[]>();

        respuesta.users.forEach((empleado) => {
          const nombre =
            empleado.company.department || 'Sin departamento';

          const empleados = grupos.get(nombre) ?? [];

          empleados.push(empleado);
          grupos.set(nombre, empleados);
        });

        this.departamentos = Array.from(
          grupos,
          ([nombre, empleados]) => ({
            nombre,
            empleados,
            expandido: false,
          }),
        ).sort((a, b) => a.nombre.localeCompare(b.nombre));

        this.cargando = false;

        this.cdr.markForCheck();
      },
      error: () => {
        this.mensajeError =
          'No se pudieron cargar los departamentos. Verificá tu conexión.';
        this.cargando = false;

        this.cdr.markForCheck();
      },
    });
  }

  // Filtra los departamentos por su nombre.
  get departamentosFiltrados(): Departamento[] {
    const termino = this.textoBusqueda.trim().toLowerCase();

    if (!termino) {
      return this.departamentos;
    }

    return this.departamentos.filter((departamento) =>
      departamento.nombre.toLowerCase().includes(termino),
    );
  }

  // Actualiza el texto ingresado en el buscador.
  filtrarDepartamentos(
    event: CustomEvent<{ value?: string | null }>,
  ): void {
    this.textoBusqueda = event.detail.value ?? '';
  }

  // Muestra u oculta los empleados de un departamento.
  alternarDepartamento(departamento: Departamento): void {
    departamento.expandido = !departamento.expandido;
  }
}
