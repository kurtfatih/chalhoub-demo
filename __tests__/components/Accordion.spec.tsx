import { render, screen } from "@testing-library/react"
import Accordion from "../../components/Accordion"

describe("Accordion component", () => {
  it("should renders the title correctly", () => {
    const title = "Test Accordion"
    const { getByText } = render(
      <Accordion defaultOpen={false} title={title} />
    )
    const titleElement = getByText(title)
    expect(titleElement).toBeInTheDocument()
  })

  it("should shows the content when opened", () => {
    const title = "Test Accordion"
    const contentText = "Test Content"
    const { getByText } = render(
      <Accordion defaultOpen={true} title={title}>
        {contentText}
      </Accordion>
    )

    const contentElement = getByText(contentText)
    expect(contentElement).toBeVisible()
  })

  it("should hides the content when closed", () => {
    const title = "Test Accordion"
    const contentText = "Test Content"
    render(
      <Accordion defaultOpen={false} title={title}>
        {contentText}
      </Accordion>
    )

    expect(screen.queryByText(contentText)).toBeNull()
  })
})
