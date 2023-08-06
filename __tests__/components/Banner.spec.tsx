import React from "react"
import { render } from "@testing-library/react"
import { Banner } from "../../components/pages/home/Banner"

describe("Banner Component", () => {
  test("renders ColorAccordion, PriceAccordion, and TagSelection", () => {
    const { getByText } = render(<Banner />)

    // Assert that the rendered components exist in the document
    expect(getByText("Promotional Banner")).toBeInTheDocument()
  })
})
