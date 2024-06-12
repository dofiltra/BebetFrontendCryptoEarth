import { IS_DEV } from '@/services/api'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {IS_DEV && <TanStackRouterDevtools />}
    </>
  ),
})
