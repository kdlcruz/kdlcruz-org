import { Client } from './client'
import { getTools } from '../utils/get-tools'

export const dynamic = "force-dynamic"

export default async function Index() {
  const myTools = await getTools()
  return (
    <Client myTools={myTools} />
  )
}
