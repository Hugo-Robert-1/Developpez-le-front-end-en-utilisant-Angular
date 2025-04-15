import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from "./components/pie-chart/pie-chart.component";
import { HeaderComponent } from "./components/header/header.component";
import { StatisticDisplayBoxComponent } from './components/statistic-display-box/statistic-display-box.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { NoopAnimationsModule  } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent,  DashboardComponent, DetailPageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule, PieChartComponent, HeaderComponent, StatisticDisplayBoxComponent, LineChartComponent, NoopAnimationsModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
