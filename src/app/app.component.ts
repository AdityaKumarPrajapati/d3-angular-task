import 'zone.js';
import { Component } from '@angular/core';
import { getMultilineData } from './utils/dummyData';
/**
 * @Description: Root Component responsible for rendering the charts
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  multilineData: Array<multilineDataPoint>;
  multilineYLabel = 'Temperature';
  multilineXLabel = 'Date';
  multilineXFormat = '%-b %-d, %Y';

  constructor() {
    this.multilineData = [];
  }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.multilineData = getMultilineData();
  }
}

interface multilineDataPoint {
  name: string;
  data: Array<lineData>;
  color?: string;
}

interface lineData {
  label: string;
  value: number;
}
