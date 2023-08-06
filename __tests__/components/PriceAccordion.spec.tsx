import { fireEvent, render, act, waitFor } from "@testing-library/react"
import { useStore } from "../../lib/zustand/store"
import { ColorAccordion } from "../../components/ui/ColorAccordion"
import { MockedProvider } from "@apollo/client/testing"
import { GET_PRODUCTS_COLORS } from "../../lib/apollo-client/operations"
import { PriceAccordion } from "../../components/ui/PriceAccordion"
import { priceOptions, priceSortOptions } from "../../constants"
import { parseThePricesRangeStringToNumber } from "../../utils"

jest.mock("../../lib/zustand/store") // Mock useStore

const mockUseStore = useStore as jest.MockedFunction<typeof useStore>

describe("Price Accordion component", () => {
  // Mock the Apollo useQuery hook

  it("should renders the Price Accordion component correctly", async () => {
    const setPrices = jest.fn()
    mockUseStore.mockReturnValue({
      prices: [],
      sortByPrice: undefined,
      setPrices,
      setSortByPrice: jest.fn()
    })

    const { getAllByTestId } = render(<PriceAccordion defaultOpen={true} />)
    const checkboxes = getAllByTestId(/checkbox/)

    expect(checkboxes).toHaveLength(
      priceOptions.length + priceSortOptions.length
    )
  })

  it("should calls setPrices when checking price options", async () => {
    const setPrices = jest.fn()
    const prices: any[] = []
    mockUseStore.mockReturnValue({
      prices,
      sortByPrice: undefined,
      setPrices: setPrices,
      setSortByPrice: jest.fn()
    })

    const { getAllByTestId } = render(<PriceAccordion defaultOpen={true} />)
    const checkboxes = getAllByTestId(/checkbox/)

    fireEvent.click(checkboxes[0])

    expect(setPrices).toHaveBeenCalledWith([
      parseThePricesRangeStringToNumber(priceOptions[0].label)
    ])

    fireEvent.click(checkboxes[1])

    expect(setPrices).toHaveBeenCalledWith([
      parseThePricesRangeStringToNumber(priceOptions[1].label)
    ])

    fireEvent.click(checkboxes[2])

    expect(setPrices).toHaveBeenCalledWith([
      parseThePricesRangeStringToNumber(priceOptions[2].label)
    ])
  })

  it("should calls setSortByPrice when checking and unchecking sort options", async () => {
    const setSortByPrice = jest.fn()

    mockUseStore.mockReturnValue({
      setSortByPrice: setSortByPrice,
      prices: [],
      sortByPrice: undefined
    })

    const { getAllByTestId } = render(<PriceAccordion defaultOpen={true} />)
    const checkboxes = getAllByTestId(/checkbox/)

    fireEvent.click(checkboxes[4])

    expect(setSortByPrice).toHaveBeenCalledWith("desc")
    fireEvent.click(checkboxes[4])

    expect(setSortByPrice).toHaveBeenCalledWith(undefined)

    fireEvent.click(checkboxes[5])
    expect(setSortByPrice).toHaveBeenCalledWith("asc")
    fireEvent.click(checkboxes[5])
    expect(setSortByPrice).toHaveBeenCalledWith(undefined)
  })
})
