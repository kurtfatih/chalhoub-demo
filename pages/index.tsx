import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType
} from "next"
import Sidebar from "../components/Sidebar"
import { Banner } from "../components/pages/home/Banner"
import { ProductList } from "../components/pages/home/ProductList"
import { GetProductsQuery } from "../lib/apollo-client/__generated__/graphql"
import { GET_PRODUCTS } from "../lib/apollo-client/operations"
import { initializeApollo } from "../lib/apollo-client/root"

export default function Home({
  products
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="pt-36 container mx-auto py-8">
      <div className="flex items-stretch gap-4">
        <div className="w-1/4">
          <Sidebar />
        </div>
        {/* Sidebar */}
        <div className="w-3/4">
          <Banner />
          {/* Banner Here */}
          <hr />
          <div className="h-10" />
          <ProductList products={products} />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<{
  products: GetProductsQuery["products"]
}> = async () => {
  const client = initializeApollo()

  const products = (await client.query({
    query: GET_PRODUCTS
  })) as { data: GetProductsQuery }

  // Will be passed to the page component as props
  return { props: { products: products.data.products } }
}
