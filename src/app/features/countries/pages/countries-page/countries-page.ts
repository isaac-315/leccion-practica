import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CountriesService } from '../../services/countries.service';


@Component({
  selector: 'app-countries-page',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './countries-page.html',
  styleUrl: './countries-page.css',
})
export class CountriesPage {
  private countriesService = inject(CountriesService);
  private route = inject(ActivatedRoute);

  currentPage$ = this.route.queryParamMap.pipe(
    map(params => Number(params.get('page')?? 1))
  );

  countriesResource = rxResource({
    stream: () => this.currentPage$.pipe(
      switchMap(page => this.countriesService.getCountries(page))
    )
  });

  getImageUrl(image: string): string {
    return `https://restcountries.com/v3.1/500${image}`;
  }
}
