import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  totalOlympics$: Observable<number> = of(0);
  totalCountries$: Observable<number> = of(0);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.totalOlympics$ = this.olympicService.countNumberOfJo();
    this.totalCountries$ = this.olympicService.countNumberOfCountries();
  }
}
