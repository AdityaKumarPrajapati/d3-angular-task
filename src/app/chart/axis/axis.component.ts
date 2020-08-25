import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { DimensionsType, ScaleType, AccessorType } from '../../utils/types';

/**
 * @Description: Component responsible for dynamic creation of both x and y axis
 * @params: dimension type, dimensions, scle, label and format ticks
 */

@Component({
  selector: '[appAxis]',
  templateUrl: './axis.component.html',
  styleUrls: ['./axis.component.css']
})
export class AxisComponent implements OnChanges {
  @Input() dimensions: DimensionsType;
  @Input() dimension: 'x' | 'y' = 'x';
  @Input() scale: ScaleType;
  @Input() label: string;
  @Input() formatTick: (value: any) => (string | number) = d3.format(',');
  private ticks: Function[];

  updateTicks() {
    if (!this.dimensions || !this.scale) { return; }

    const numberOfTicks = this.dimension == 'x'
      ? this.dimensions.boundedWidth < 600
        ? this.dimensions.boundedWidth / 100
        : this.dimensions.boundedWidth / 250
      : this.dimensions.boundedHeight / 70;

    this.ticks = this.scale.ticks(numberOfTicks);
    this.ticks.forEach(d => console.log(this.scale.domain(), this.scale.range(), d, this.scale(d)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTicks();
  }
}
