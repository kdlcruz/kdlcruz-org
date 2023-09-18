import { useQuery } from "@tanstack/react-query"
import { gsQueryKeys } from "../queryKeys"
import { Resume } from "../../../../utils/types"
import { GetResumeOptions } from "../types"
import { resume } from '../../../data/resume'

export const useGetResume =  <T = Resume[]>(
  options?: GetResumeOptions<T>
) => {
  const initialData = resume as Resume[]
  const query = useQuery({
    queryKey: gsQueryKeys.getResume(),
    queryFn: fetchResume,
    initialData,
    ...options
  })

  return query
}

const fetchResume = async () => {
  const res = await fetch(`/api/resume`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })

  const data = (await res.json()) as Resume[]
  return data
}