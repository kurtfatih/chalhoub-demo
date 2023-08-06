import { render } from "@testing-library/react"
import { ProductList } from "../../components/pages/home/ProductList"
import { GetProductsQuery } from "../../lib/apollo-client/__generated__/graphql"

const mockFilteredProducts: GetProductsQuery["products"] = [
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
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    colors: ["Black", "White"],
    tags: ["New", "Cheapest"],
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
    slug: ""
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    colors: ["Khaki"],
    tags: ["Recommended"],
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
    slug: ""
  }
]

const mockStore = {
  columnCount: 3, // Set any necessary mock values here.
  colors: [],
  prices: [],
  tag: ""
}

// Mock the useStore hook.
jest.mock("../../lib/zustand/store", () => ({
  useStore: jest.fn(() => mockStore)
}))

// Mock the useFilterProducts hook.
jest.mock("../../hooks/useFilterProducts", () => ({
  useFilterProducts: jest.fn(() => ({
    filteredProducts: mockFilteredProducts,
    setFilterOptions: jest.fn()
  }))
}))

describe("ProductList Component", () => {
  test("renders product cards correctly", () => {
    const { getByText, getByTestId } = render(
      <ProductList products={mockFilteredProducts} />
    )

    const productListGrid = getByTestId("product-list-grid").className

    // Assert that the product cards are rendered correctly.
    expect(getByText(mockFilteredProducts[0].title)).toBeInTheDocument()
    expect(getByText(mockFilteredProducts[1].title)).toBeInTheDocument()
    expect(getByText(mockFilteredProducts[2].title)).toBeInTheDocument()
    expect(productListGrid).toEqual(
      `grid grid-cols-2 md:grid-cols-${mockStore.columnCount} gap-3 mt-24 md:mt-0 md:gap-6 px-1`
    )
  })
})
