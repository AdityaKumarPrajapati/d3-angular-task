import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MultilineComponent } from './multiline/multiline.component';
import { ChartComponent } from './chart/chart.component';
import { AreaComponent } from './chart/area/area.component';
import { AxisComponent } from './chart/axis/axis.component';
import { LineComponent } from './chart/line/line.component';
import { CirclesComponent } from './chart/circles/circles.component';

@NgModule({
  declarations: [
    AppComponent,
    MultilineComponent,
    ChartComponent,
    AreaComponent,
    AxisComponent,
    LineComponent,
    CirclesComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
