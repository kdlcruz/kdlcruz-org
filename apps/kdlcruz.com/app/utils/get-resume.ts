import { Resume, ResumeRowData, Tech, techLevel } from './types'
import { getTools } from './get-tools'
import { getSheetDoc } from './google-sheet'

export const revalidate = 20

export const getResume = async () => {
  const doc = getSheetDoc()

  const tools = await getTools()
  const allTechs: Tech[] = []
  tools.forEach(tool => {
    allTechs.push(...tool.techs)
  })

  await doc.loadInfo()
  const sheet = doc.sheetsByTitle['Resume']

  const rows = await sheet.getRows<ResumeRowData>()

  const final: Resume[] = []
  
  for (const main of rows) {
    const tools: string[] = main.get('Tools').split(', ')
    const resumeTools: Tech[] = []

    tools.forEach(tool => {
      const tech = allTechs.find(tech => tech.name.toLowerCase() === tool.toLowerCase())
      if (tech) {
        resumeTools.push(tech)
      } else {
        resumeTools.push({
          name: tool,
          level: techLevel.experienced
        })
      }
    })

    final.push({
      companyName: main.get('Company Name'),
      employmentDate: main.get('Employment Date'),
      cover: main.get('Cover Image'),
      position: main.get('Position'),
      description: main.get('Responsibility'),
      techs: [...resumeTools.filter(tech => tech.level === techLevel.expert), ...resumeTools.filter(tech => tech.level === techLevel.experienced), ...resumeTools.filter(tech => tech.level === techLevel.amateur)]
    })
  }
  
  return final
}
