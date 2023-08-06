import React from "react"
import { render } from "@testing-library/react"
import { GetProductBySlugQuery } from "../../lib/apollo-client/__generated__/graphql"
import ProductDetailPage, {
  getServerSideProps
} from "../../pages/product/[slug]"

const mockProduct: GetProductBySlugQuery["getProductBySlug"] = {
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  description: "Mock description",
  price: 109.95,
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 }
}

jest.mock("../../lib/apollo-client/root", () => ({
  initializeApollo: () => ({
    query: jest.fn().mockResolvedValue({
      data: {
        getProductBySlug: mockProduct
      }
    })
  })
}))

describe("Product detail page", () => {
  it("should renders without crashing", () => {
    const { container } = render(<ProductDetailPage product={null} />)
    expect(container).toBeTruthy()
  })

  it("should renders with products", () => {
    const { container, getByText, getByAltText } = render(
      <ProductDetailPage product={mockProduct} />
    )
    expect(container).toBeInTheDocument()
    expect(getByText(mockProduct.title)).toBeInTheDocument()
    expect(getByText(`$ ${mockProduct.price}`)).toBeInTheDocument()
    expect(getByText(mockProduct.description)).toBeInTheDocument()
    expect(getByAltText("product image")).toBeInTheDocument()
    expect(getByText(mockProduct.rating.count)).toBeInTheDocument()
    expect(getByText("Buy now")).toBeInTheDocument()
  })

  it("should getServerSideProps", async () => {
    const serverSideProps = (await getServerSideProps({
      query: { slug: "test-item" }
    } as any)) as {
      props: { product: GetProductBySlugQuery["getProductBySlug"] }
    }
    expect(serverSideProps.props.product).toEqual(mockProduct)
  })
})
