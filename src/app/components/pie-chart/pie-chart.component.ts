import { Component, HostListener } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  data: any[] = [];
  tooltipX = 0;
  tooltipY = 0;
  showTooltip = false;
  tooltipText = '';
  countryName = '';
  medalCount = '';

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#A8385D', '#7AA3E5', '#A27EA8', '#AAE3F5', '#ADCDED', '#A95963']
  };

  private subscription: Subscription = new Subscription();

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    const olympicSubscription = this.olympicService.getOlympicChartData().subscribe(result => {
      this.data = result;
    });

    this.subscription.add(olympicSubscription);
  }

  onDeactivate(): void {
    this.showTooltip = false;
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(event: any, mouseEvent: MouseEvent): void {
    const tooltipWidth = 100;
    const tooltipHeight = 50;
    
    this.tooltipX = mouseEvent.clientX - tooltipWidth / 2;
    this.tooltipY = mouseEvent.clientY - tooltipHeight - 15;
  
    this.countryName = event.value.name;
    this.medalCount = `🏅 ${event.value.value}`;
  
    this.showTooltip = true;
  }
  
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.showTooltip) {
      const tooltipWidth = 100;
      const tooltipHeight = 50;
  
      this.tooltipX = event.clientX - tooltipWidth / 2;
      this.tooltipY = event.clientY - tooltipHeight - 15;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

