import React from "react"
import { render } from "@testing-library/react"
import Home, { getServerSideProps } from "../../pages/index"
import { MockedProvider } from "@apollo/client/testing"
import { GET_PRODUCTS_COLORS } from "../../lib/apollo-client/operations"
import { GetProductsQuery } from "../../lib/apollo-client/__generated__/graphql"
import ProductCard from "../../components/pages/home/ProductCard"

const mockProducts: GetProductsQuery["products"] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    colors: ["Blue", "Orange"],
    tags: ["New"],
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
    slug: ""
  }
]

jest.mock("../../lib/apollo-client/root", () => ({
  initializeApollo: () => ({
    query: jest.fn().mockResolvedValue({
      data: {
        products: mockProducts
      }
    })
  })
}))

describe("Home Page", () => {
  const mocks = [
    {
      request: { query: GET_PRODUCTS_COLORS },
      result: {
        data: ["red", "blue"]
      }
    }
  ]

  it("renders without crashing", () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home products={[]} />
      </MockedProvider>
    )
    expect(container).toBeTruthy()
  })

  it("renders with products", () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home products={mockProducts} />
      </MockedProvider>
    )
    expect(container).toBeInTheDocument()
  })

  it("getServerSideProps", async () => {
    const serverSideProps = (await getServerSideProps({} as any)) as {
      props: { products: GetProductsQuery["products"] }
    }
    expect(serverSideProps.props.products.length).toBeGreaterThan(0)
    expect(serverSideProps.props.products).toEqual(mockProducts)
  })
})
