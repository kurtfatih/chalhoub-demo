export const parseThePricesRangeStringToNumber = (priceRangeStr: string) => {
  const splittedPriceRange = priceRangeStr.split("-")

  return {
    start: parseInt(splittedPriceRange[0], 10),
    end: parseInt(splittedPriceRange[1], 10)
  }
}

export const parseNumberToPriceRangeString = ({
  start,
  end
}: {
  start: number
  end: number
}) => {
  return `${start}-${end}`
}
