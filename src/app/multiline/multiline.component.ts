import { Component, Input, ViewChild, ElementRef, AfterContentInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import * as d3 from 'd3';
import { DimensionsType, ScaleType, AccessorType } from '../utils/types';
/**
 * @Description: Component responsible for creating dynamic multiple lines with different color
 * @params: data, labels and format
 */

interface multilineDataPoint {
  name: string;
  data: Array<coord>;
  color?: string;
}

interface coord {
  label: string;
  value: number;
}

@Component({
  selector: 'app-multiline',
  templateUrl: './multiline.component.html',
  styleUrls: ['./multiline.component.css'],
})

export class MultilineComponent implements AfterContentInit, OnChanges {
  @Input() data: Array<multilineDataPoint>;
  @Input() labelX: string;
  @Input() labelY: string;
  @Input() formatX: string;

  parseDate: (value: string) => object;
  labelAccessor: AccessorType;
  valueAccessor: AccessorType;
  areaColor = '#d3d3d3'; // color for the area between minimum value line and maximum value lines 

  public areaCoordinates: Array<coord>;
  public dimensions: DimensionsType;
  public xScale: ScaleType;
  public yScale: ScaleType;

  public xAccessorScaled: AccessorType;
  public yAccessorScaled: AccessorType;

  public formatDate: (date: object) => string;
  public items: object[] = [];
  public lineData: Array<object> = [];
  colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  @ViewChild('container', { static: true }) container: ElementRef;
  constructor() {
    // TODO - should be managed globally (from config etc)
    this.dimensions = {
      marginTop: 40,
      marginRight: 40,
      marginBottom: 75,
      marginLeft: 75,
      height: 500,
      width: 0,
    }; // dimensions for the chart 

    const { height, marginTop, marginBottom } = this.dimensions;

    this.dimensions = {
      ...this.dimensions,
      boundedHeight: Math.max(height - marginTop - marginBottom, 0),
    };
  }
  // hosting the native element
  @HostListener('window:resize') windowResize() {
    this.updateDimensions();
  }

  updateDimensions() {
    const width = this.container.nativeElement.offsetWidth;
    const { marginLeft, marginRight } = this.dimensions;

    this.dimensions = {
      ...this.dimensions,
      width,
      boundedWidth: Math.max(width - marginLeft - marginRight, 0),
    };
    this.formatDate = d3.timeFormat(this.formatX);

    this.updateScales();
  }

  ngAfterContentInit() {
    this.updateDimensions();
  }

  ngOnInit() {
    this.parseDate = d3.timeParse('%Y-%m-%d');
    this.labelAccessor = (d) => this.parseDate(d.label);
    this.valueAccessor = (d) => d.value || 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateScales();
  }

  getFlattenData() {
    let finalData = [];
    this.data.forEach(d => {
      finalData = [...finalData, ...d.data];
    });

    return finalData;
  }

  getAreaCoordinates(data) {
    const minGrouped = new Map();
    const maxGrouped = new Map();

    data.forEach(element => {
      if (!minGrouped.has(element.label)) {
        minGrouped.set(element.label, element);
        maxGrouped.set(element.label, element);
      }

      const minValue = minGrouped.get(element.label);
      if (minValue.value > element.value) {
        minGrouped.set(element.label, element);
      }

      const maxValue = maxGrouped.get(element.label);
      if (maxValue.value < element.value) {
        maxGrouped.set(element.label, element);
      }
    });

    return [...[...minGrouped.values()], ...[...maxGrouped.values()].reverse()];
  }

  updateScales() {
    const flattenData = this.getFlattenData();
    this.areaCoordinates = this.getAreaCoordinates(flattenData);
    console.log(this.areaCoordinates);

    this.xScale = d3.scaleTime()
      .domain(d3.extent(flattenData, this.labelAccessor))
      .range([0, this.dimensions.boundedWidth]);

    this.yScale = d3.scaleLinear()
      .domain(d3.extent(flattenData, this.valueAccessor))
      .range([this.dimensions.boundedHeight, 0])
      .nice();

    this.xAccessorScaled = d => this.xScale(this.labelAccessor(d));
    this.yAccessorScaled = d => this.yScale(this.valueAccessor(d));
  }
}
