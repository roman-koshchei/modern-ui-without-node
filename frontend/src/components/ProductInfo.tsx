import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"
import { useEffect, useState } from "react"

const fetchProduct = async (id: string | null) => {
  const response = await fetch(`/api/single/${id}`)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}

const queryClient = new QueryClient()

export function ProductInfo() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductInfoInside />
    </QueryClientProvider>
  )
}

function ProductInfoInside() {
  const [productId, setProductId] = useState("")

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search)
      const id = searchParams.get("id") ?? ""
      setProductId(id)
    } catch (err) {
      console.error(err)
    }
  }, [])

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    enabled: productId != "",
  })

  if (productId == "") {
    return <div>Loading...</div>
  }

  if (isLoading) return <div>Loading...</div>

  if (isError)
    return <div>Error fetching product information: {error?.message}</div>

  return (
    <div>
      <h2>Product Details</h2>
      <p>
        <strong>Id:</strong> {data.id}
      </p>
      <p>
        <strong>Name:</strong> {data.name}
      </p>
      <p>
        <strong>Day:</strong> {data.day}
      </p>
    </div>
  )
}
