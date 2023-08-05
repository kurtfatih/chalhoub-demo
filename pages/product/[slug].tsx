import { GET_PRODUCTS_BY_SLUG } from "../../lib/apollo-client/operations"
import Image from "next/image"
import ReviewStars from "../../components/ReviewStar"
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types"
import { GetProductBySlugQuery } from "../../lib/apollo-client/__generated__/graphql"
import { initializeApollo } from "../../lib/apollo-client/root"
import { LinkButton } from "../../components/Button"

export default function ProductDetailPage({
  product
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="pt-36 container mx-auto">
      <div className="flex px-4 flex-col md:flex-row  gap-6">
        <div className="flex w-full">
          <div className="flex w-full md:justify-end bg-white">
            <div
              style={{
                position: "relative",
                width: "100%"
              }}
              className="h-64 md:h-96"
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
        <div className="flex pb-4 w-full">
          <div className="flex w-full bg-white">
            <div className="flex w-full md:w-3/4 flex-col gap-16">
              <div className="flex w-full gap-8 flex-col">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-s leading-[100px]">
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

              <div className="w-full flex-col md:flex-row flex items-baseline justify-between">
                <div className="flex items-start">
                  <ReviewStars
                    count={product.rating.count ?? 0}
                    rate={product.rating.rate ?? 0}
                    size="xl"
                  />
                </div>
                <div className="flex justify-end w-full md:w-auto mt-1">
                  <LinkButton title="Buy now" href="" />
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
