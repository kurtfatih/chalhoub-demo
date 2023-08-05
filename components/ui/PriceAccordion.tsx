import { useStore } from "../../lib/zustand/store"
import { parseThePricesRangeStringToNumber } from "../../utils"
import Accordion from "../Accordion"
import { Checkbox } from "../Checkbox"

export const PriceAccordion = () => {
  const { setPrices, prices, sortByPrice, setSortByPrice } = useStore()

  const handlePrices = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseThePricesRangeStringToNumber(e.currentTarget.value)

    if (e.currentTarget.checked) {
      setPrices([...prices, { start: value.start, end: value.end }])
    } else {
      setPrices(
        prices.filter(
          ({ start, end }) => start !== value.start && end !== value.end
        )
      )
    }
  }

  const handlePriceSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      if (e.currentTarget.value) {
        setSortByPrice(e.currentTarget.value as any)
      }
    } else {
      if (e.currentTarget.value) {
        setSortByPrice(undefined)
      }
    }
  }

  return (
    <Accordion defaultOpen={false} title="Price">
      <label>Price</label>
      <div className="h-4" />
      <div className="flex flex-col">
        {priceOptions.map((price, index) => (
          <Checkbox
            onChange={handlePrices}
            key={index}
            label={price.label}
            value={price.label}
            checked={prices.some(
              (prevPrice) =>
                prevPrice.start === price.value.start &&
                prevPrice.end === price.value.end
            )}
          />
        ))}
      </div>
      <hr />
      <div className="h-4" />
      <label>Sort</label>
      <div className="h-4" />
      <div className="flex flex-col">
        {priceSortOptions.map(({ value, label }, index) => (
          <Checkbox
            onChange={handlePriceSort}
            key={index}
            label={label}
            value={value}
            checked={value === sortByPrice}
          />
        ))}
      </div>
    </Accordion>
  )
}

const priceOptions = [
  { label: "0-100", value: { start: 0, end: 100 } },
  { label: "100-200", value: { start: 100, end: 200 } },
  { label: "200-300", value: { start: 200, end: 300 } },
  { label: "500-1000", value: { start: 500, end: 1000 } }
]

const priceSortOptions = [
  { value: "desc", label: "High to Low" },
  { value: "asc", label: "Low to High" }
]
