import { renderHook } from "@testing-library/react"
import { useFilterProducts } from "../../hooks/useFilterProducts"
import { GetProductsQuery } from "../../lib/apollo-client/__generated__/graphql"

describe("useFilterProducts", () => {
  const mockInitialProducts: GetProductsQuery["products"] = [
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
      title: "Mens Casual Premium Slim Fit T-Shirts ",
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
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should return an empty array if no initial products provided", () => {
    const { result } = renderHook(() => useFilterProducts([]))
    expect(result.current.filteredProducts).toEqual([])
  })

  it("should return initial products when no filters applied", () => {
    const { result } = renderHook(() => useFilterProducts(mockInitialProducts))

    expect(result.current.filteredProducts).toEqual(mockInitialProducts)
  })

  it("should filter products by color", () => {
    const { result } = renderHook(() =>
      useFilterProducts(mockInitialProducts, { colors: ["Khaki"] })
    )

    expect(result.current.filteredProducts).toEqual([mockInitialProducts[2]])
  })

  it("should filter products by price", () => {
    const { result } = renderHook(() =>
      useFilterProducts(mockInitialProducts, {
        prices: [{ start: 0, end: 100 }]
      })
    )

    expect(result.current.filteredProducts).toEqual([
      mockInitialProducts[1],
      mockInitialProducts[2]
    ])
  })

  it("should filter products by tag", () => {
    const { result } = renderHook(() =>
      useFilterProducts(mockInitialProducts, { tag: "New" })
    )

    expect(result.current.filteredProducts).toEqual([
      mockInitialProducts[0],
      mockInitialProducts[1]
    ])
  })

  it("should sort products by price in ascending order", () => {
    const { result } = renderHook(() =>
      useFilterProducts(mockInitialProducts, { sortByPrice: "asc" })
    )

    expect(result.current.filteredProducts).toEqual(
      mockInitialProducts.sort((a, b) => a.price - b.price)
    )
  })

  it("should sort products by price in descending order", () => {
    const { result } = renderHook(() =>
      useFilterProducts(mockInitialProducts, { sortByPrice: "desc" })
    )

    expect(result.current.filteredProducts).toEqual(
      mockInitialProducts.sort((a, b) => b.price - a.price)
    )
  })
})
