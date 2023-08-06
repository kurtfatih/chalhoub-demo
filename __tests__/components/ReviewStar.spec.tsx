import React from "react"
import { render } from "@testing-library/react"
import ReviewStars from "../../components/ReviewStar"

describe("ReviewStars component", () => {
  test("should renders correctly with default size", () => {
    const count = 10
    const rate = 4.5
    const { getAllByTestId, getByText } = render(
      <ReviewStars count={count} rate={rate} />
    )

    // Assert that the correct number of filled and empty stars are displayed
    expect(getAllByTestId("star-filled")).toHaveLength(4)
    expect(getAllByTestId("star-empty")).toHaveLength(1)

    // Assert that the count is displayed correctly
    expect(getByText(String(count))).toBeInTheDocument()
  })

  test("should renders correctly with xl size", () => {
    const count = 5
    const rate = 3.2
    const { getAllByTestId, getByText } = render(
      <ReviewStars count={count} rate={rate} size="xl" />
    )

    // Assert that the correct number of filled and empty stars are displayed
    expect(getAllByTestId("star-filled")).toHaveLength(3)
    expect(getAllByTestId("star-empty")).toHaveLength(2)

    // Assert that the count is displayed correctly
    expect(getByText(String(count))).toBeInTheDocument()
  })
})
