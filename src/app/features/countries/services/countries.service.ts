import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CountriesPage } from '../pages/countries-page/countries-page';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,flags';

 // Devuelve un Observable tipado; no hace la llamada hasta que alguien se suscribe.
  getCountries(page: number = 1): Observable<CountriesPage> {
    return this.http
      // <SimpsonsResponse> le dice a TypeScript que esperamos ese shape de datos.
      // Es tipado estatico (compile-time), no transforma el JSON en runtime.
      .get<CountriesPage>(`${this.baseUrl}/countries?page=${page}`)
      .pipe(
        // tap permite inspeccionar/loggear la respuesta sin modificarla.
        tap((response) => {
          console.log('Countries API response:', response);
        }),
        // Si la peticion falla, convertimos el error en uno mas legible para la UI.
        catchError(err =>
          throwError(() => new Error('No se pudieron cargar los personajes'))
        )
      );
  }
}