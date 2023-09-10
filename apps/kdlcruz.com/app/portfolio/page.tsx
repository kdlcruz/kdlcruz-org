import { Client } from './client'
import { getPortfolio } from '../server/portfolio'

export default async function Index() {
  const projects = await getPortfolio()
  return (
    <Client projects={projects} />
  )
}
