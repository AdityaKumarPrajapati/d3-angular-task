import * as d3 from "d3"

const boxMullerRandom = () => (
  Math.sqrt(-2.0 * Math.log(Math.random())) *
  Math.cos(2.0 * Math.PI * Math.random())
)
const randomAroundMean = (mean, deviation) => mean + boxMullerRandom() * deviation

const today = new Date()
const formatDate = d3.timeFormat("%Y-%m-%d")

const colors = ['#CD6155', '#AF7AC5', '#7FB3D5', '#76D7C4', '#F7DC6F', '#F0B27A', '#85929E']
/**
 * @description: method for generating timeline data
 */
export const getTimelineData = (length = 20) => {
  let value = randomAroundMean(-5, 40)
  const firstTemperature = d3.timeDay.offset(today, -length)

  return new Array(length).fill(0).map((d, i) => {
    value += randomAroundMean(0, 10)
    return {
      label: formatDate(d3.timeDay.offset(firstTemperature, i)),
      value,
    }
  })
}
/**
 * @description: method for generating data for multiline chart in random manner, it will return a list of temp data with dates for random between min and max
 */
export const getMultilineData = () => {
  const min = 2;
  const max = 6;
  const length = Math.floor(Math.random() * (max - min) + min);

  return new Array(length).fill(0).map((d, i) => {
    return {
      name: `name: ${i}`,
      data: getTimelineData(),
      color: colors[i],
    }
  })
}

