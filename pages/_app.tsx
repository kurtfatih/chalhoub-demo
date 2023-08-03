import "./global.css"
import { ApolloProvider } from "@apollo/client"
import { useApollo } from "../lib/apollo-client/root"
import { AppProps } from "next/app"
import Link from "next/link"

interface CustomPageProps {}

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
