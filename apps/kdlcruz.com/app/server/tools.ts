import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import { MyTools, NumberToTechLevel, Techs, ToolsRowData, numberToTechLevel } from './types'

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
})

const doc = new GoogleSpreadsheet(process.env?.GOOGLE_SPREADSHEET_ID ?? '', serviceAccountAuth)

export const getTools = async () => {
  await doc.loadInfo()
  const sheet = doc.sheetsByTitle['Tools']

  const rows = await sheet.getRows<ToolsRowData>()

  const final: MyTools[] = []
  
  for (const main of rows) {
    const techString = main.get('Techs')
    const techs = techString.split(',')
    const finalTechs: Techs[] = []

    for (const tech of techs) {
      const [techName, level]: [string, NumberToTechLevel] = tech.split(':')
      finalTechs.push({ name: techName, level: numberToTechLevel[level] })
    }

    final.push({
      title: main.get('Title'),
      techs: finalTechs
    })
  }
  
  return final
}
