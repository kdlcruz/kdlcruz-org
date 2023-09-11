import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import { Link, PortfolioRowData, Projects, Tech, techLevel } from './types'
import { getTools } from './get-tools'
import { cache } from 'react'

export const getPortfolio = cache(async () => {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  })
  
  const doc = new GoogleSpreadsheet(process.env?.GOOGLE_SPREADSHEET_ID ?? '', serviceAccountAuth)

  const tools = await getTools()
  const allTechs: Tech[] = []
  tools.forEach(tool => {
    allTechs.push(...tool.techs)
  })
  
  await doc.loadInfo()
  const sheet = doc.sheetsByTitle['Portfolio']

  const rows = await sheet.getRows<PortfolioRowData>()

  const final: Projects[] = []

  for (const main of rows) {
    const tools: string[] = main.get('Tools').split(', ')
    const projectTechs: Tech[] = []

    tools.forEach(tool => {
      const tech = allTechs.find(tech => tech.name.toLowerCase() === tool.toLowerCase())
      if (tech) {
        projectTechs.push(tech)
      } else {
        projectTechs.push({
          name: tool,
          level: techLevel.experienced
        })
      }
    })

    const links: string[] = main.get('Links').split(',')
    const projectLinks: Link[] = []

    links.forEach(linkWithType => {
      const [linkType, link] = linkWithType.split(':')
      projectLinks.push({ link, linkType })
    })

    final.push({
      name: main.get('Project Name'),
      description: main.get('Description'),
      cover: main.get('Cover Image'),
      techs: [...projectTechs.filter(tech => tech.level === techLevel.expert), ...projectTechs.filter(tech => tech.level === techLevel.experienced), ...projectTechs.filter(tech => tech.level === techLevel.amateur)],
      links: projectLinks
    })
  }
  
  return final
})
