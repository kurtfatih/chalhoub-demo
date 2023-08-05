import { useMemo } from "react"
import { useStore } from "../../../lib/zustand/store"
import ProductCard from "./ProductCard"
import { GetProductsQuery } from "../../../lib/apollo-client/__generated__/graphql"
import { useFilterProducts } from "../../../hooks/useFilterProducts"

export const ProductList: React.FC<{
  products: GetProductsQuery["products"]
}> = ({ products }) => {
  const { filteredProducts } = useFilterProducts(products)
  const { columnCount } = useStore()
  const productList = useMemo(() => filteredProducts, [filteredProducts])

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-${columnCount} gap-3 mt-24 md:mt-0 md:gap-6 px-1`}
    >
      {productList.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}
