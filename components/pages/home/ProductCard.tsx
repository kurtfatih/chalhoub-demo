import Link from "next/link"
import { GetProductsQuery } from "../../../lib/apollo-client/__generated__/graphql"
import ReviewStars from "../../ReviewStar"
import Image from "next/image"
import { memo } from "react"
import { Button } from "../../Button"

interface ProductTilePropsI {
  product: GetProductsQuery["products"][0]
}

const ProductCard: React.FC<ProductTilePropsI> = ({ product }) => {
  return (
    <Link data-testid="product-card-link" href={`product/${product.slug}`}>
      <div
        className="w-full flex md:hover:scale-105
      md:transform md:transition
      cursor-pointer flex-col
      bg-white border border-gray-100
      rounded-5xl  dark:bg-gray-800 dark:border-gray-700 h-full"
      >
        <div className="p-1 md:p-8">
          {/* IMAGE */}
          <div
            style={{
              position: "relative",
              width: "100%"
            }}
            className="h-48 md:h-80"
          >
            <Image
              data-testid="product-image"
              src={product.image}
              fill
              style={{ objectFit: "contain" }}
              alt="product image"
            />
          </div>
        </div>
        <div className="flex justify-between flex-1 flex-col px-1 pb-2  md:px-5 md:pb-5">
          <div>
            <h5 className="text-md md:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {product.title}
            </h5>
            <ReviewStars
              rate={product.rating.rate}
              count={product.rating.count}
            />
          </div>
          <div className="flex flex-col items-start md:flex-row justify-self-end md:items-center justify-between">
            <span className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {product?.price}$
            </span>
            <div className="flex justify-end w-full md:w-auto mt-1">
              <Button title="Checkout" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default memo(ProductCard)
