import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { AccessorType } from '../../utils/types';
/**
 * @Description: Component responsible for filling area between minimum value line and maximum value lines
 * @params: data, x and y accessor along with interpolation
 */
@Component({
  selector: '[appArea]',
  template: `
    <svg:path
      ngClass="area"
      [attr.d]="areaString"
      [attr.stroke] = "color"
      [attr.stroke-width] = "1.5"
      [style.stroke-linejoin] = "linejoin"
      [style.stroke-linecap] = "linecap"
      [style.fill]="fill">
    </svg:path>
  `,
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnChanges {
  @Input() data: object[];
  @Input() xAccessor: AccessorType;
  @Input() yAccessor: AccessorType;
  @Input() color: string;
  @Input() interpolation?: Function = d3.curveLinear;

  areaString: '';

  // TODO - to pass from parent components
  linejoin: 'square';
  linecap: 'square';
  fill: 'fill';

  updateAreaString(): void {
    const lineGenerator = d3.line()
      .x(this.xAccessor)
      .y(this.yAccessor)
      .curve(this.interpolation);

    this.areaString = lineGenerator(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateAreaString();
  }
}
