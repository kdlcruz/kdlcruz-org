export const gsQueryKeys = {
  tools: [{ scope: 'gs-tools' }] as const,
  resume: [{ scope: 'gs-resume' }] as const,
  projects: [{ scope: 'gs-projects' }] as const,
  getTools: () =>
    [{ ...gsQueryKeys.tools[0] }] as const,
  getResume: () =>
    [{ ...gsQueryKeys.resume[0] }] as const,
  getProjects: () =>
    [{ ...gsQueryKeys.projects[0] }] as const,
}
