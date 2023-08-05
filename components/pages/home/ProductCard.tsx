import Link from "next/link"
import { GetProductsQuery } from "../../../lib/apollo-client/__generated__/graphql"
import ReviewStars from "../../ReviewStar"
import Image from "next/image"
import { memo } from "react"
import { LinkButton } from "../../Button"

interface ProductTilePropsI {
  product: GetProductsQuery["products"][0]
}

const ProductCard: React.FC<ProductTilePropsI> = ({ product }) => {
  return (
    <Link href={`product/${product.slug}`} passHref>
      <div className="w-full hover:scale-105 transform transition cursor-pointer flex flex-col bg-white border border-gray-100 rounded-5xl  dark:bg-gray-800 dark:border-gray-700">
        <div className="p-8">
          {/* IMAGE */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px"
            }}
          >
            <Image
              src={product.image}
              layout="fill"
              objectFit="contain"
              alt="product image"
            />
          </div>
        </div>
        <div className="flex justify-between flex-1 flex-col px-5 pb-5">
          <div>
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.title}
              </h5>
            </a>
            <ReviewStars
              rate={product.rating.rate}
              count={product.rating.count}
            />
          </div>
          <div className="flex justify-self-end items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {product?.price}$
            </span>
            <LinkButton title="Checkout" href={`product/${product.slug}`} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default memo(ProductCard)
