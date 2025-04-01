import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error('Erreur au cours de la récupération des données', error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics(): Observable<Olympic[] | null> {
    return this.olympics$.asObservable();
  }

  countNumberOfJo(): Observable<number> {
    return this.getOlympics().pipe(
      map(olympics => {
        if (!olympics || olympics.length === 0) return 0;

        const uniqueYears = new Set(
          olympics.reduce((years, olympic) => {
            return years.concat(olympic.participations.map(p => p.year));
          }, [] as number[])
        );

        return uniqueYears.size;
      })
    );
  }

  countNumberOfCountries(): Observable<number> {
    return this.getOlympics().pipe(
      map(olympics => {
        if (!olympics || olympics.length === 0) return 0;

        const uniqueCountry = new Set(
          olympics.reduce((country, olympic) => {
            return country.concat(olympic.country);
          }, [] as string[])
        );

        return uniqueCountry.size;
      })
    );
  }

  // Formattage des données pour afficher les données sur le diagramme circulaire
  getOlympicChartData(): Observable<{ name: string; value: number; id: number }[]> {
    return this.getOlympics().pipe(
      map(olympics => {
        if (!olympics) return [];
        
        return olympics.map(country => ({
          name: country.country,
          value: country.participations.reduce((sum, p) => sum + p.medalsCount, 0), // Somme des médailles
          id: country.id
        }));
      })
    );
  }
}
