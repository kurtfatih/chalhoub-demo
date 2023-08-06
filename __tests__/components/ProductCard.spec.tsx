import React from "react"
import { render, waitFor } from "@testing-library/react"
import ProductCard from "../../components/pages/home/ProductCard"

describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    colors: ["Blue", "Orange"],
    tags: ["New"],
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
    slug: "test-item"
  }

  it("renders the product card with correct data", async () => {
    const { getByText, getByTestId, getByRole } = render(
      <ProductCard product={mockProduct} />
    )
    const productImage = getByTestId("product-image")
    const productCardLink = getByTestId("product-card-link")

    // Check if product title is rendered
    expect(getByText(mockProduct.title)).toBeInTheDocument()
    // Check if product rating count exist
    expect(getByText(mockProduct.rating.count)).toBeInTheDocument()
    // Check if product price exist
    expect(getByText(mockProduct.price + "$")).toBeInTheDocument()
    // Check if product image exist
    expect(productImage).toBeInTheDocument()
    // Check if checkout button exist
    expect(getByRole("button", { name: "Checkout" })).toBeInTheDocument()
    // Check if product card link href exist
    expect(productCardLink.getAttribute("href")).toEqual(
      `product/${mockProduct.slug}`
    )
    // Check if product image link exist
    await waitFor(() => {
      expect(productImage).toHaveAttribute(
        "src",
        `/_next/image?url=${encodeURIComponent(mockProduct.image)}&w=3840&q=75`
      )
    })
  })
})
