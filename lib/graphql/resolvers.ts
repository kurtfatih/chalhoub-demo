import { ContextType } from "../../pages/api/graphql"

export const resolvers = {
  Query: {
    products: async (_: any, __: any, contextValue: ContextType) => {
      const products = await contextValue.dataSources.productApi.products

      return products
    },
    getProductBySlug: async (
      _: any,
      args: { slug: string },
      contextValue: ContextType
    ) => {
      const products = await contextValue.dataSources.productApi.products
      const product = products.find((value) => value.slug() === args.slug)

      return product!
    },
    getProductsColors: async (
      _: any,
      args: { slug: string },
      contextValue: ContextType
    ) => {
      const colors =
        await contextValue.dataSources.productApi.getProductsColors()

      const uniqueColors = colors.filter(
        (color, index, array) => array.indexOf(color) === index
      )

      return uniqueColors
    }
  }
}
