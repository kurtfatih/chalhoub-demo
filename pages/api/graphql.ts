import { ApolloServer } from "@apollo/server"
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { resolvers } from "../../lib/graphql/resolvers"
import typeDefs from "../../lib/graphql/schema.graphql"
import { NextApiRequest, NextApiResponse } from "next"
import { mockProductApi } from "../../lib/dummyProductApi/api"

export type ContextType = {
  req: NextApiRequest
  res: NextApiResponse
  dataSources: {
    productApi: typeof mockProductApi
  }
}

const server = new ApolloServer<ContextType>({
  resolvers,
  typeDefs,
  plugins:
    process.env.NODE_ENV === "production"
      ? [ApolloServerPluginLandingPageDisabled()]
      : undefined
})

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    req,
    res,
    dataSources: {
      productApi: mockProductApi
    }
  })
})
