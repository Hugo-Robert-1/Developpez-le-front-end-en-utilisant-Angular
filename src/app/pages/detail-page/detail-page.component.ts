import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LineChartData } from 'src/app/core/models/LineChart.type';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss'
})
export class DetailPageComponent implements OnInit {
  countryData: Olympic | undefined;
  private subscription!: Subscription;
  totalParticipations: number = 0;
  totalMedals: number = 0;
  totalAthletes: number = 0;
  lineChartData: LineChartData[] = [];
  medalsByYear: { name: string; value: number; }[] = [];
 
  constructor(private olympicService: OlympicService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const countryId = Number(this.route.snapshot.paramMap.get('id'));

    this.subscription = this.olympicService.getCountryById(countryId).subscribe((country) => {
      if (!country) return;
  
      this.countryData = country;
      this.totalParticipations = country.participations.length;
      this.totalMedals = country.participations.reduce((sum, p) => sum + p.medalsCount, 0);
      this.totalAthletes = country.participations.reduce((sum, p) => sum + p.athleteCount, 0);
      this.medalsByYear = country.participations.map(p => ({
        name: (p.year).toString(),
        value: p.medalsCount
      }));
      this.lineChartData = this.formatDataLineChart(this.countryData?.country, this.medalsByYear);
    });
  }

  // // Formattage des données pour respecter le format attendu par la libraire ngx-chart pour afficher les données sur le diagramme linéaire
  formatDataLineChart(name?: string, series?: { name: string; value: number }[]): LineChartData[] {
    if (!name || !series) return [];
  
    return [{
      name,
      series
    }];
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
