import { useQuery } from "@tanstack/react-query"
import { gsQueryKeys } from "../queryKeys"
import { Projects } from "../../../../utils/types"
import { GetProjectsOptions } from "../types"
import { projects } from '../../../data/projects'

export const useGetPortfolio =  <T = Projects[]>(
  options?: GetProjectsOptions<T>
) => {
  const initialData = projects as Projects[]
  const query = useQuery({
    queryKey: gsQueryKeys.getProjects(),
    queryFn: fetchProjects,
    initialData,
    ...options
  })

  return query
}

const fetchProjects = async () => {
  const res = await fetch(`/api/projects`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })

  const data = (await res.json()) as Projects[]
  return data
}