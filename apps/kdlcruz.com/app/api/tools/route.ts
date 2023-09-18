import { getTools } from '../../utils/get-tools'

export const revalidate = 20

export async function GET(request: Request) {
  const tools = await getTools()
  return new Response(JSON.stringify(tools))
}