import { graphql } from "../__generated__/gql"

export const GET_PRODUCTS = graphql(`
  query GetProducts {
    products {
      id
      category
      image
      price
      rating {
        count
        rate
      }
      title
      slug
      colors
      tags
    }
  }
`)

export const GET_PRODUCTS_BY_SLUG = graphql(`
  query GetProductBySlug($productSlug: String!) {
    getProductBySlug(slug: $productSlug) {
      title
      description
      category
      image
      price
      rating {
        count
        rate
      }
    }
  }
`)

export const GET_PRODUCTS_COLORS = graphql(`
  query ProductsColors {
    getProductsColors
  }
`)
