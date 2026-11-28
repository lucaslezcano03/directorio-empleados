import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {
  private clave = 'empleados-favoritos';

  idsFavoritos: number[] = [];

  // Recupera los favoritos guardados.
  async cargarFavoritos(): Promise<void> {
    const resultado = await Preferences.get({
      key: this.clave,
    });

    if (resultado.value) {
      try {
        const ids: unknown = JSON.parse(resultado.value);

        if (Array.isArray(ids)) {
          this.idsFavoritos = ids.filter((id): id is number => typeof id === 'number');
          return;
        }
      } catch {
        this.idsFavoritos = [];
      }
    }

    this.idsFavoritos = [];
  }

  // Comprueba si un empleado está marcado como favorito.
  esFavorito(id: number): boolean {
    return this.idsFavoritos.includes(id);
  }

  // Agrega o quita un empleado de favoritos.
  async alternarFavorito(id: number): Promise<void> {
    if (this.esFavorito(id)) {
      this.idsFavoritos = this.idsFavoritos.filter((favoritoId) => favoritoId !== id);
    } else {
      this.idsFavoritos = [...this.idsFavoritos, id];
    }

    await Preferences.set({
      key: this.clave,
      value: JSON.stringify(this.idsFavoritos),
    });
  }
}
