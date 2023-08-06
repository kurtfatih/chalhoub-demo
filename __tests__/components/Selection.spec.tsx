import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Selection from "../../components/Selection"

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 }
]

const onChangeMock = jest.fn()

describe("Selection component", () => {
  it("should renders the selected option label correctly", () => {
    render(
      <Selection
        selected={options[0]}
        options={options}
        onChange={onChangeMock}
      />
    )
    const selectedOptionLabel = screen.getByTestId("selected-option-label")
    expect(selectedOptionLabel.textContent).toBe(options[0].label)
  })

  it("should opens the options list when the button is clicked", async () => {
    const { getByTestId, getByRole } = render(
      <Selection
        selected={options[0]}
        options={options}
        onChange={onChangeMock}
      />
    )
    const listboxButton = getByTestId("listbox-button")

    await waitFor(() => fireEvent.click(listboxButton))

    const optionsList = getByRole("listbox")
    expect(optionsList).toBeInTheDocument()
  })

  it("should calls onChange callback when an option is selected", async () => {
    const { getAllByRole } = render(
      <Selection
        selected={options[0]}
        options={options}
        onChange={onChangeMock}
      />
    )
    const listboxButton = screen.getByTestId("listbox-button")
    await waitFor(() => fireEvent.click(listboxButton))

    const allOptions = getAllByRole("option")

    fireEvent.click(allOptions[1])
    expect(onChangeMock).toHaveBeenCalledWith(options[1])
  })
})
