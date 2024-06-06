import { createLazyFileRoute } from '@tanstack/react-router'
import App from '@/Components/App/Main/App'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return <App />
}
