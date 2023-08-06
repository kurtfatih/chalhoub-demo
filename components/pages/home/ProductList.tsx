import { useEffect, useMemo } from "react"
import { useStore } from "../../../lib/zustand/store"
import ProductCard from "./ProductCard"
import { GetProductsQuery } from "../../../lib/apollo-client/__generated__/graphql"
import { useFilterProducts } from "../../../hooks/useFilterProducts"

export const ProductList: React.FC<{
  products: GetProductsQuery["products"]
}> = ({ products }) => {
  const { columnCount, colors, prices, tag, sortByPrice } = useStore()
  const { filteredProducts, setFilterOptions } = useFilterProducts(products, {
    colors,
    prices,
    tag,
    sortByPrice
  })
  const productList = useMemo(() => filteredProducts, [filteredProducts])

  useEffect(() => {
    setFilterOptions({ colors, prices, tag, sortByPrice })
  }, [colors, prices, tag, sortByPrice])

  return (
    <div
      data-testid="product-list-grid"
      className={`grid grid-cols-2 md:grid-cols-${columnCount} gap-3 mt-24 md:mt-0 md:gap-6 px-1`}
    >
      {productList.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}
