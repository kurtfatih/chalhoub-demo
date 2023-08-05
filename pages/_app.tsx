import "./global.css"
import { ApolloProvider } from "@apollo/client"
import { useApollo } from "../lib/apollo-client/root"
import { AppProps } from "next/app"
import { MainLayout } from "../components/Layout"

interface CustomPageProps {}

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const apolloClient = useApollo((pageProps as any).initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  )
}

export default MyApp
