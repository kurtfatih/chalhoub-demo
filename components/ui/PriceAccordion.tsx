import { priceOptions, priceSortOptions } from "../../constants"
import { useStore } from "../../lib/zustand/store"
import { parseThePricesRangeStringToNumber } from "../../utils"
import Accordion from "../Accordion"
import { Checkbox } from "../Checkbox"

interface PriceAccordionPropsI {
  defaultOpen?: boolean
}

export const PriceAccordion: React.FC<PriceAccordionPropsI> = ({
  defaultOpen = false
}) => {
  const { setPrices, prices, sortByPrice, setSortByPrice } = useStore()

  const handlePrices = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseThePricesRangeStringToNumber(e.currentTarget.value)

    if (e.currentTarget.checked) {
      setPrices([...prices, { start: value.start, end: value.end }])
    } else {
      console.debug("hey", prices)
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
    <Accordion defaultOpen={defaultOpen} title="Price">
      <label>Price</label>
      <div className="h-4" />
      <div className="flex flex-col">
        {priceOptions.map((price, index) => (
          <Checkbox
            onChange={handlePrices}
            key={index}
            label={price.label}
            value={price.label}
            defaultChecked={prices.some(
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
            defaultChecked={value === sortByPrice}
          />
        ))}
      </div>
    </Accordion>
  )
}
