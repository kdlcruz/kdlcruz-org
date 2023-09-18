import { UseQueryOptions } from "@tanstack/react-query"
import { MyTools, Projects, Resume } from "../../../utils/types"
import { gsQueryKeys } from "./queryKeys"

export type GetToolsOptions<T> = Omit<
  UseQueryOptions<MyTools[], unknown, T, ReturnType<typeof gsQueryKeys.getTools>>,
  'queryKey' | 'queryFn'>

export type GetResumeOptions<T> = Omit<
  UseQueryOptions<Resume[], unknown, T, ReturnType<typeof gsQueryKeys.getResume>>,
  'queryKey' | 'queryFn'>

export type GetProjectsOptions<T> = Omit<
  UseQueryOptions<Projects[], unknown, T, ReturnType<typeof gsQueryKeys.getProjects>>,
  'queryKey' | 'queryFn'>