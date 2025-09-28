import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/$productId')({
  component: RouteComponent,
})

function RouteComponent() {
    const { productId } = Route.useParams()
  return <div>Hello {productId}!</div>
}
