import { fireEvent, render, waitFor } from "@testing-library/react"
import { useStore } from "../../lib/zustand/store"
import { ColorAccordion } from "../../components/ui/ColorAccordion"
import { MockedProvider } from "@apollo/client/testing"
import { GET_PRODUCTS_COLORS } from "../../lib/apollo-client/operations"

jest.mock("../../lib/zustand/store") // Mock useStore

const mockUseStore = useStore as jest.MockedFunction<typeof useStore>

describe("ColorAccordion component", () => {
  // Mock the Apollo useQuery hook
  const mockData = {
    getProductsColors: ["Red", "Green", "Blue"]
  }

  const mocks = [
    {
      request: { query: GET_PRODUCTS_COLORS },
      result: {
        data: mockData
      }
    }
  ]

  it("should renders the ColorAccordion component correctly", async () => {
    mockUseStore.mockReturnValue({
      colors: ["Red"],
      setColors: jest.fn()
    })

    const { getByText, getAllByTestId } = render(
      <MockedProvider mocks={mocks}>
        <ColorAccordion />
      </MockedProvider>
    )
    const titleElement = getByText("Color")

    const colorCheckbox = await waitFor(() => getAllByTestId(/checkbox/))

    expect(colorCheckbox).toHaveLength(mockData.getProductsColors.length)
    expect(titleElement).toBeInTheDocument()
  })

  it("should checks the checkbox when color is in the state", async () => {
    mockUseStore.mockReturnValue({
      colors: ["Red", "Blue"],
      setColors: jest.fn()
    })

    const { getAllByTestId } = render(
      <MockedProvider mocks={mocks}>
        <ColorAccordion />
      </MockedProvider>
    )

    const checkboxes = await waitFor(() => getAllByTestId(/checkbox/))

    const redCheckbox = checkboxes.find((checkbox) =>
      checkbox.getAttribute("value")?.includes("Red")
    )
    const blueCheckbox = checkboxes.find((checkbox) =>
      checkbox.getAttribute("value")?.includes("Blue")
    )
    const greenCheckbox = checkboxes.find((checkbox) =>
      checkbox.getAttribute("value")?.includes("Green")
    )

    expect(redCheckbox).toBeChecked()
    expect(blueCheckbox).toBeChecked()
    expect(greenCheckbox).not.toBeChecked()
  })

  it("should calls setColors correctly when checking checkbox", async () => {
    const setColorsMock = jest.fn()

    mockUseStore.mockReturnValue({
      colors: ["Red", "Green"],
      setColors: setColorsMock
    })

    const { getAllByTestId } = render(
      <MockedProvider mocks={mocks}>
        <ColorAccordion />
      </MockedProvider>
    )

    const checkboxes = await waitFor(() => getAllByTestId(/checkbox/))

    const blueCheckbox = checkboxes.find((checkbox) =>
      checkbox.getAttribute("value")?.includes("Blue")
    )

    // Simulate checking the checkbox
    if (blueCheckbox) {
      fireEvent.click(blueCheckbox)
    }

    expect(setColorsMock).toHaveBeenCalledWith(["Red", "Green", "Blue"])
  })
})
