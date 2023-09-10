import { Client } from './client'
import { getTools } from '../server/tools'

export default async function Index() {
  const myTools = await getTools()
  return (
    <Client myTools={myTools} />
  )
}
