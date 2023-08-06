import React from "react"
import { render, fireEvent, act, waitFor } from "@testing-library/react"
import { useStore } from "../../lib/zustand/store"
import { TagSelection } from "../../components/ui/TagSelection"
import { tags } from "../../constants"

// Mocking the useStore hook to avoid external dependencies during testing
jest.mock("../../lib/zustand/store") // Mock useStore

const mockUseStore = useStore as jest.MockedFunction<typeof useStore>

describe("TagSelection component", () => {
  it("should render with the initial selected tag", () => {
    mockUseStore.mockReturnValue({
      setTag: jest.fn()
    })

    const { getByText } = render(<TagSelection />)
    expect(getByText("No tag selected...")).toBeInTheDocument()
  })

  it("should change the selected tag and call setTag on selection change", async () => {
    const setTag = jest.fn()
    mockUseStore.mockReturnValue({
      setTag
    })

    const { getAllByRole, getByTestId } = render(<TagSelection />)

    // Select a new tag
    await waitFor(() => fireEvent.click(getByTestId("listbox-button")))

    const options = getAllByRole("option")

    await waitFor(() => fireEvent.click(options[1]))

    const selectedOption = getByTestId("selected-option-label")

    expect(selectedOption.textContent).toEqual(tags[1].value)
    expect(setTag).toHaveBeenCalledWith(tags[1].value)
  })
})
