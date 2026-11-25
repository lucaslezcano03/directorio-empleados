
import {
  ChangeDetectorRef,
  Component,
  inject,
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
  IonBadge,
  IonButton,
  IonIcon,
  IonSpinner,
  IonText,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

import type { Empleado } from '../models/empleado.model';
import { EmpleadosService } from '../services/empleados.service';
import { FavoritosService } from '../services/favoritos.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonBadge,
    IonButton,
    IonIcon,
    IonSpinner,
    IonText,
  ],
})
export class Tab3Page {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly empleadosService = inject(EmpleadosService);
  readonly favoritosService = inject(FavoritosService);

  empleadosFavoritos: Empleado[] = [];

  cargando = true;
  mensajeError = '';

  constructor() {
    addIcons({ heart, heartOutline });
  }

  // Actualiza la lista al entrar en la pestaña.
  ionViewWillEnter(): void {
    void this.cargarFavoritos();
  }

  private async cargarFavoritos(): Promise<void> {
    this.cargando = true;
    this.mensajeError = '';

    this.cdr.markForCheck();

    try {
      await this.favoritosService.cargarFavoritos();
    } catch {
      this.mensajeError = 'No se pudieron recuperar los favoritos.';
      this.cargando = false;

      this.cdr.markForCheck();
      return;
    }

    if (this.favoritosService.idsFavoritos.length === 0) {
      this.empleadosFavoritos = [];
      this.cargando = false;

      this.cdr.markForCheck();
      return;
    }

    this.empleadosService.obtenerEmpleados().subscribe({
      next: (respuesta) => {
        this.empleadosFavoritos = respuesta.users.filter(
          (empleado) => this.favoritosService.esFavorito(empleado.id),
        );

        this.cargando = false;

        this.cdr.markForCheck();
      },
      error: () => {
        this.mensajeError =
          'No se pudieron cargar los empleados favoritos.';
        this.cargando = false;

        this.cdr.markForCheck();
      },
    });
  }

  // Quita un empleado de la lista de favoritos.
  async quitarFavorito(id: number): Promise<void> {
    await this.favoritosService.alternarFavorito(id);

    this.empleadosFavoritos = this.empleadosFavoritos.filter(
      (empleado) => empleado.id !== id,
    );

    this.cdr.markForCheck();
  }
}
