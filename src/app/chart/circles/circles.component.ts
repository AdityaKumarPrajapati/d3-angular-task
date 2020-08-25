import { Component, Input } from '@angular/core';
import { AccessorType } from '../../utils/types';
/**
 * @Description: Component responsible for dynamic creation of dot in the chart
 * @params: data, color, accessor type and radius of the circle
 */
@Component({
  selector: '[appCircles]',
  template: `
    <svg:circle
      *ngFor="let circle of data; trackBy: keyAccessor"
      [attr.cx]="xAccessor(circle, $index)"
      [attr.cy]="yAccessor(circle, $index)"
      [attr.r]="radius"
      [attr.stroke-width] = "1.5"
      [attr.stroke] = "color"
      [style.stroke-linejoin] = "square"
      [style.stroke-linecap] = "square"
      [attr.fill]="color">
    </svg:circle>
  `,
  styleUrls: ['./circles.component.css']
})
export class CirclesComponent {
  @Input() data: object[];
  @Input() color: string;
  @Input() keyAccessor: AccessorType;
  @Input() xAccessor: AccessorType;
  @Input() yAccessor: AccessorType;
  @Input() radius = 4;
}
