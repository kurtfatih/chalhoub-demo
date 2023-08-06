import React from "react"
import { render } from "@testing-library/react"
import Sidebar from "../../components/Sidebar"

// Mock the child components that are used inside Sidebar
jest.mock("../../components/ui/ColorAccordion", () => ({
  ColorAccordion: () => <div>ColorAccordion</div>
}))
jest.mock("../../components/ui/PriceAccordion", () => ({
  PriceAccordion: () => <div>PriceAccordion</div>
}))
jest.mock("../../components/ui/TagSelection", () => ({
  TagSelection: () => <div>TagSelection</div>
}))

describe("Sidebar Component", () => {
  test("renders ColorAccordion, PriceAccordion, and TagSelection", () => {
    const { getByText } = render(<Sidebar />)

    // Assert that the rendered components exist in the document
    expect(getByText("ColorAccordion")).toBeInTheDocument()
    expect(getByText("PriceAccordion")).toBeInTheDocument()
    expect(getByText("TagSelection")).toBeInTheDocument()
  })
})
