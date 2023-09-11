import { Client } from './client'
import { getTools } from '../utils/get-tools'

export const revalidate = 20

export default async function Index() {
  const myTools = await getTools()
  return (
    <Client myTools={myTools} />
  )
}
