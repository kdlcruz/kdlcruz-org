import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

export const getSheetDoc = () => {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  })
  
  const doc = new GoogleSpreadsheet(process.env?.GOOGLE_SPREADSHEET_ID ?? '', serviceAccountAuth)

  return doc
}