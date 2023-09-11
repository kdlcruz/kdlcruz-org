import { getPortfolio } from '../utils/get-porfolio'
import { Client } from './client'

export const revalidate = 20

export default async function Page() {
  const projects = await getPortfolio()
  return (
    <Client projects={projects} />
  )
}
