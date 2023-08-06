import { useEffect, useReducer, useState } from "react"
import { GetProductsQuery } from "../lib/apollo-client/__generated__/graphql"

// Assuming `useStore` and `GetProductsQuery` are imported correctly from their respective modules.

type Product = GetProductsQuery["products"][0]

interface FilterOptions {
  colors?: string[]
  prices?: { start: number; end: number }[]
  tag?: string
  sortByPrice?: "asc" | "desc"
}

function filterProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  const { colors, prices, tag, sortByPrice } = options
  let filteredProducts = [...products]

  if (colors && colors.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      product.colors.some((color) => colors.includes(color))
    )
  }

  if (prices && prices.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      prices.some(
        ({ start, end }) => product.price > start && product.price < end
      )
    )
  }

  if (tag && tag.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      product.tags.some((productTag) => productTag === tag)
    )
  }

  if (sortByPrice) {
    filteredProducts.sort((a, b) =>
      sortByPrice === "asc" ? a.price - b.price : b.price - a.price
    )
  }

  return filteredProducts
}

export function useFilterProducts(
  initialProducts: GetProductsQuery["products"],
  initialOptions?: FilterOptions
) {
  const [options, setOptions] = useState<FilterOptions>(initialOptions ?? {})

  const filteredProducts = filterProducts(initialProducts, options)

  return { filteredProducts, setFilterOptions: setOptions }
}
