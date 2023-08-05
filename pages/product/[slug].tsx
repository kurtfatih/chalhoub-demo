import { GET_PRODUCTS_BY_SLUG } from "../../lib/apollo-client/operations"
import Image from "next/image"
import ReviewStars from "../../components/ReviewStar"
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types"
import { GetProductBySlugQuery } from "../../lib/apollo-client/__generated__/graphql"
import { initializeApollo } from "../../lib/apollo-client/root"

export default function ProductDetailPage({
  product
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="pt-36 container mx-auto">
      <div className="flex gap-6">
        <div className="flex w-full">
          <div className="flex w-full justify-end bg-white">
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "500px",
                maxWidth: "500px"
              }}
            >
              {product?.image && (
                <Image
                  src={product.image}
                  layout="fill"
                  objectFit="contain"
                  alt="product image"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex w-full bg-white">
            <div className="flex w-3/4 flex-col gap-16">
              <div className="flex w-full gap-8 flex-col">
                <div>
                  <h1 className="text-4xl font-bold text-s leading-[100px]">
                    {product.title}
                  </h1>
                </div>
                <div>
                  <h3 className="text-4xl font-semibold text-brand-red">
                    $ {product.price}
                  </h3>
                </div>

                <div>
                  <h3 className="text-sm text-gray-600  font-semibold">
                    {product.description}
                  </h3>
                </div>
              </div>

              <div className="w-full flex items-baseline justify-between">
                <div className="flex items-start">
                  <ReviewStars
                    count={product.rating.count ?? 0}
                    rate={product.rating.rate ?? 0}
                    size="xl"
                  />
                </div>
                <div>
                  <a
                    href="#"
                    className="text-white transition-all bg-black hover:bg-brand-red focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-16 py-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  product: GetProductBySlugQuery["getProductBySlug"]
}> = async ({ query }) => {
  const { slug } = query
  const client = initializeApollo()

  try {
    const product = (await client.query({
      query: GET_PRODUCTS_BY_SLUG,
      variables: { productSlug: slug as string }
    })) as { data: GetProductBySlugQuery }

    return {
      props: { product: product.data.getProductBySlug }
    }
  } catch {
    return {
      notFound: true
    }
  }
}
