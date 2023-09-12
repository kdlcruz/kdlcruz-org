import { Client } from './client'
import { getResume } from '../utils/get-resume'

export const dynamic = "force-dynamic"

export default async function Index() {
  const resume = await getResume()
  return (
    <Client resume={resume} />
  )
}
