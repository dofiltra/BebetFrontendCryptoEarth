import { createLazyFileRoute } from '@tanstack/react-router';
import { AdminPage } from "@/pages/admin";

export const Route = createLazyFileRoute('/admin')({
  component: Index,
})

function Index() {
  return (
    <AdminPage/>
  )
}
