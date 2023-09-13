import { MyTools, NumberToTechLevel, Tech, ToolsRowData, numberToTechLevel, techLevel } from './types'
import { getSheetDoc } from './google-sheet'

export const revalidate = 20

export const getTools = async () => {
  const doc = getSheetDoc()

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
}
