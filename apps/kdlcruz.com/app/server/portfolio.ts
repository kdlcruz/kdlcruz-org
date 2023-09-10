import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import { Link, PortfolioRowData, Projects, Techs, techLevel } from './types'
import { getTools } from './tools'

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
})

const doc = new GoogleSpreadsheet(process.env?.GOOGLE_SPREADSHEET_ID ?? '', serviceAccountAuth)

export const getPortfolio = async () => {
  const tools = await getTools()
  const allTechs: Techs[] = []
  tools.forEach(tool => {
    allTechs.push(...tool.techs)
  })
  
  await doc.loadInfo()
  const sheet = doc.sheetsByTitle['Portfolio']

  const rows = await sheet.getRows<PortfolioRowData>()

  const final: Projects[] = []

  for (const main of rows) {
    const tools: string[] = main.get('Tools').split(', ')
    const projectTechs: Techs[] = []

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
      techs: projectTechs,
      links: projectLinks
    })
  }
  
  return final
}
