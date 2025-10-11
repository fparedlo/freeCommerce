import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create-account')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/create-account"!</div>
}
