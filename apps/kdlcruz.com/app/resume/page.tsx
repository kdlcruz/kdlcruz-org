import { Client } from './client'
import { getResume } from '../server/resume'

export default async function Index() {
  const resume = await getResume()
  return (
    <Client resume={resume} />
  )
}
