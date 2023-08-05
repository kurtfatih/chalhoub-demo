import { useEffect, useReducer } from "react"
import { useStore } from "../lib/zustand/store"
import { GetProductsQuery } from "../lib/apollo-client/__generated__/graphql"

export const useFilterProducts = (
  initialProducts: GetProductsQuery["products"]
) => {
  const { colors, prices, tag, sortByPrice } = useStore()

  function reducer(
    state: GetProductsQuery["products"],
    action: {
      type?:
        | "set"
        | "reset"
        | "filterByColor"
        | "filterByPrice"
        | "filterByTag"
        | "sortPriceAsc"
        | "sortPriceDesc"
      payload?: GetProductsQuery["products"]
    }
  ) {
    switch (action.type) {
      case "filterByColor": {
        return state.filter((product) =>
          product.colors.some((color) => colors.includes(color))
        )
      }

      case "filterByPrice": {
        return state.filter((product) =>
          prices.some(
            ({ start, end }) => product.price > start && product.price < end
          )
        )
      }

      case "filterByTag": {
        return state.filter((product) =>
          product.tags.some((productTag) => productTag === tag)
        )
      }

      case "sortPriceAsc": {
        const mutate = [...state]
        return mutate.sort((a, b) => a.price - b.price)
      }

      case "sortPriceDesc": {
        const mutate = [...state]
        return mutate.sort((a, b) => b.price - a.price)
      }

      case "set": {
        return action.payload ?? []
      }

      case "reset": {
        return action.payload ?? []
      }

      default: {
        return state
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    dispatch({ type: "set", payload: initialProducts })
  }, [initialProducts])

  useEffect(() => {
    if (initialProducts) {
      dispatch({ type: "reset", payload: initialProducts })

      if (colors.length > 0) {
        dispatch({ type: "filterByColor" })
      }

      if (prices.length > 0) {
        dispatch({ type: "filterByPrice" })
      }

      if (tag.length > 0) {
        dispatch({ type: "filterByTag" })
      }

      if (sortByPrice) {
        if (sortByPrice === "asc") dispatch({ type: "sortPriceAsc" })
        if (sortByPrice === "desc") dispatch({ type: "sortPriceDesc" })
      }
    }
  }, [colors, prices, tag, sortByPrice])

  return { filteredProducts: state }
}
