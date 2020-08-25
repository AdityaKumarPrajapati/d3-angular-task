import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { AccessorType } from '../../utils/types';

/**
 * @Description: Component responsible for creating dynamic lines with different color
 * @params: data, x and y accessor along with color
 */
@Component({
  selector: '[appLine]',
  template: `
    <svg:path
      ngClass="line"
      [attr.d]="lineString"
      [attr.stroke] = "color"
      [attr.stroke-width] = "1.5"
      [style.stroke-linejoin] = "linejoin"
      [style.stroke-linecap] = "linecap"
      [style.fill]="fill">
    </svg:path>
  `,
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnChanges {
  @Input() data: object[];
  @Input() xAccessor: AccessorType;
  @Input() yAccessor: AccessorType;
  @Input() color: string;

  @Input() interpolation?: Function = d3.curveLinear;
  lineString: '';

  // TODO - pass from parent components
  linejoin: 'square';
  linecap: 'square';
  fill: 'fill';

  updateLineString(): void {
    const lineGenerator = d3.line()
      .x(this.xAccessor)
      .y(this.yAccessor)
      .curve(this.interpolation);

    this.lineString = lineGenerator(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLineString();
  }
}
