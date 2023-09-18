import { getResume } from '../../utils/get-resume'

export const revalidate = 20

export async function GET(request: Request) {
  const resume = await getResume()
  return new Response(JSON.stringify(resume))
}