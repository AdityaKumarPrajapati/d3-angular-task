import { LineChartComponent } from './line-chart/line-chart.component';
import { Component, ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'linechart';
  @ViewChild('lineChart', { static: true }) chart: LineChartComponent;
}
