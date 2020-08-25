/**
  @Description: Method for managing accessors
  @params: d, i and accessor
 */
export const useAccessor = (accessor, d, i) => (
  typeof accessor == "function" ? accessor(d, i) : accessor
)

/**
  @Description: Method for managing dimension types
  @params: margins, height, width and bounded height and width
 */

export interface DimensionsType {
  marginTop: number
  marginRight: number
  marginBottom: number
  marginLeft: number
  height: number
  width: number
  boundedHeight?: number
  boundedWidth?: number
}

/**
 * @Description: Method for calculating the unique id
 * @params: lastId and prefix
 */

let lastId = 0
export const getUniqueId = (prefix = "") => {
  lastId++
  return [prefix, lastId].join("-")
}
