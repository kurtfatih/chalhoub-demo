import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Checkbox } from "../../components/Checkbox"

describe("Checkbox component", () => {
  test("should renders correctly with defaultChecked", () => {
    const label = "Test Checkbox"
    const value = "test-value"
    const onChange = jest.fn()
    const defaultChecked = true

    const { getByTestId, getByText } = render(
      <Checkbox
        label={label}
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
    )

    // Assert that the checkbox and label are rendered correctly
    const checkbox = getByTestId(`${label}-checkbox`)
    const labelElement = getByText(label)

    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute("type", "checkbox")
    expect(checkbox).toHaveAttribute("value", value)
    expect(checkbox).toBeChecked()
    expect(labelElement).toBeInTheDocument()
  })

  test("should triggers onChange event when clicked", () => {
    const label = "Test Checkbox"
    const value = "test-value"
    const onChange = jest.fn()
    const defaultChecked = false

    const { getByTestId } = render(
      <Checkbox
        label={label}
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
    )

    // Simulate clicking on the checkbox
    const checkbox = getByTestId(`${label}-checkbox`)
    fireEvent.click(checkbox)

    // Assert that the onChange event is called with the correct value
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(expect.any(Object))
    expect(onChange.mock.calls[0][0].target.value).toBe(value)
    expect(checkbox).toBeChecked()

    // Simulate clicking on the checkbox again
    fireEvent.click(checkbox)

    // Assert that the onChange event is called again with the updated value
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange.mock.calls[1][0].target.value).toBe(value)
    expect(checkbox).not.toBeChecked()
  })
})
