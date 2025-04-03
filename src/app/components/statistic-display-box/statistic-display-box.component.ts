import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-display-box',
  standalone: true,
  imports: [],
  templateUrl: './statistic-display-box.component.html',
  styleUrl: './statistic-display-box.component.scss'
})
export class StatisticDisplayBoxComponent {
  @Input() statisticName: string = '';
  @Input() statisticNumber: number = 0;
}
