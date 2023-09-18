import { useQuery } from "@tanstack/react-query"
import { gsQueryKeys } from "../queryKeys"
import { MyTools } from "../../../../utils/types"
import { GetToolsOptions } from "../types"
import { tools } from '../../../data/tools'

export const useGetTools =  <T = MyTools[]>(
  options?: GetToolsOptions<T>
) => {
  const initialData = tools as MyTools[]
  const query = useQuery({
    queryKey: gsQueryKeys.getTools(),
    queryFn: fetchTools,
    initialData,
    ...options
  })

  return query
}

const fetchTools = async () => {
  const res = await fetch(`/api/tools`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })

  const data = (await res.json()) as MyTools[]
  return data
}