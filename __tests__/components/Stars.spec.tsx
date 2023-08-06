import React from "react"
import { render } from "@testing-library/react"
import { StarsIcon } from "../../components/icons/Stars"

describe("StarsIcon component", () => {
  test("should renders correct number of filled and empty stars with default size", () => {
    const filledRate = 3
    const emptyRate = 2
    const { getAllByTestId } = render(
      <StarsIcon filledRate={filledRate} emptyRate={emptyRate} />
    )

    // Assert that the correct number of filled and empty stars are displayed
    expect(getAllByTestId("star-filled")).toHaveLength(filledRate)
    expect(getAllByTestId("star-empty")).toHaveLength(emptyRate)
  })

  test("should renders correct number of filled and empty stars with xl size", () => {
    const filledRate = 4
    const emptyRate = 1
    const { getAllByTestId } = render(
      <StarsIcon filledRate={filledRate} emptyRate={emptyRate} size="xl" />
    )

    // Assert that the correct number of filled and empty stars are displayed
    expect(getAllByTestId("star-filled")).toHaveLength(filledRate)
    expect(getAllByTestId("star-empty")).toHaveLength(emptyRate)
  })
})
