import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/summary/$briefId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/summary/$briefId"!</div>
}
