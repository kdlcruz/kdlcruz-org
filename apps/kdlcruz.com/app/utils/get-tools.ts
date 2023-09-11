import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import { MyTools, NumberToTechLevel, Tech, ToolsRowData, numberToTechLevel, techLevel } from './types'
import { cache } from 'react'

export const revalidate = 20

export const getTools = cache(async () => {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  })
  
  const doc = new GoogleSpreadsheet(process.env?.GOOGLE_SPREADSHEET_ID ?? '', serviceAccountAuth)

  await doc.loadInfo()
  const sheet = doc.sheetsByTitle['Tools']

  const rows = await sheet.getRows<ToolsRowData>()

  const final: MyTools[] = []
  
  for (const main of rows) {
    const techString = main.get('Techs')
    const techs = techString.split(',')
    const finalTechs: Tech[] = []

    for (const tech of techs) {
      const [techName, level]: [string, NumberToTechLevel] = tech.split(':')
      finalTechs.push({ name: techName, level: numberToTechLevel[level] })
    }

    final.push({
      title: main.get('Title'),
      techs: [...finalTechs.filter(tech => tech.level === techLevel.expert), ...finalTechs.filter(tech => tech.level === techLevel.experienced), ...finalTechs.filter(tech => tech.level === techLevel.amateur)]
    })
  }
  
  return final
})
