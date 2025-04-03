import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticDisplayBoxComponent } from './statistic-display-box.component';

describe('StatisticDisplayBoxComponent', () => {
  let component: StatisticDisplayBoxComponent;
  let fixture: ComponentFixture<StatisticDisplayBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticDisplayBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticDisplayBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
