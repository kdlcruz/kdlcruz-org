import { getPortfolio } from '../../utils/get-porfolio'

export const revalidate = 20

export async function GET(request: Request) {
  const projects = await getPortfolio()
  return new Response(JSON.stringify(projects))
}